import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URLL ?? "https://date.nager.at/api/v3",
  withCredentials: true,
})

