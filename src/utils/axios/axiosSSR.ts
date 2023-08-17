import { env } from "@/env.mjs";
import axios from "axios";

const axiosSSR = axios.create({
  baseURL: `${env.BACKEND_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosSSR;
