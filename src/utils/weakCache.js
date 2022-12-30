import { CONSOLE_SUCCESS, CONSOLE_PRIMARY } from "../constants";

export const weakCache = async (f) => {
  const cache = new Map();

  const cleanup = new FinalizationRegistry((key) => {
    const ref = cache.get(key);
    if (ref && !ref.deref()) cache.delete(key);
  });

  return async (key) => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) {
        console.log(
          `%cCACHED_IMAGE: Size: ${cached.size}, Type: ${cached.type}`,
          CONSOLE_SUCCESS
        );
        return cached;
      }
    }

    const fresh = await f(key);
    console.log(
      `%cFETCHED_IMAGE: Size: ${fresh.size}, Type: ${fresh.type}`,
      CONSOLE_PRIMARY
    );
    cache.set(key, new WeakRef(fresh));
    cleanup.register(fresh, key);
    return fresh;
  };
};
