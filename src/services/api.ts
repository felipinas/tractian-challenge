import axios from "axios";

export const baseURL = "https://fake-api.tractian.com/";

export const api = axios.create({
  baseURL,
});
