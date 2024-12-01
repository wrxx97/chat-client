import client from ".";
import { LoginInputs, RegisterInputs } from "..";

export const login = async (user: LoginInputs) => {
  const response = await client.post("/signin", user);
  return response.data;
};

export const register = async (user: RegisterInputs) => {
  const response = await client.post("/signup", user);
  return response.data;
};
