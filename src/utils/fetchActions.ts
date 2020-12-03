import { http } from "./Http";

export const postAction = async (path: string, body = {}) => {
  const response = await http.post(path, body);
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
};

export const getAction = async (path: string) => {
  const response = await http.get(path);
  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result;
};
