import axios from "axios";
import { CONSOLE_ERROR } from "../constants";

export const loadImage = async (url) => {
  try {
    return (
      await axios.get(`${url}`, {
        responseType: "blob",
      })
    ).data;
  } catch (e) {
    console.log(`%cFETCHED_FAILED: ${e}`, CONSOLE_ERROR);
  }
};
