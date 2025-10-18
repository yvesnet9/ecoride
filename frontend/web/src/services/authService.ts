// 🌿 src/services/authService.ts
import { api } from "../api/api";


export const registerUser = async (name: string, email: string, password: string) => {
  const { data } = await API.post("/users/register", { name, email, password });
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const { data } = await API.post("/users/login", { email, password });
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

export const checkSession = async () => {
  const { data } = await API.get("/users/check");
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
