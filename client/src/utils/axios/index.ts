import axiosOG from "axios";

export const axios = axiosOG.create({
  baseURL: "http://localhost:1000",
  withCredentials: true,
});
