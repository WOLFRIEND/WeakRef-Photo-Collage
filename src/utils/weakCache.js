import { CONSOLE_SUCCESS, CONSOLE_PRIMARY, CONSOLE_ERROR } from "../constants";

export const weakCache = async (f) => {
  const cache = new Map();

  const cleanup = new FinalizationRegistry(({ key, size, type }) => {
    const ref = cache.get(key);
    if (ref && !ref.deref()) {
      cache.delete(key);
      console.log(
        `%cCLEANED_IMAGE: Url: ${key}, Size: ${size}, Type: ${type}`,
        CONSOLE_ERROR
      );
    }
  });

  return async (key) => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) {
        console.log(
          `%cCACHED_IMAGE: Url: ${key}, Size: ${cached.size}, Type: ${cached.type}`,
          CONSOLE_SUCCESS
        );
        return cached;
      }
    }

    const fresh = await f(key);
    console.log(
      `%cFETCHED_IMAGE: Url: ${key}, Size: ${fresh.size}, Type: ${fresh.type}`,
      CONSOLE_PRIMARY
    );
    cache.set(key, new WeakRef(fresh));
    cleanup.register(fresh, { key, size: fresh.size, type: fresh.type });
    return fresh;
  };
};
