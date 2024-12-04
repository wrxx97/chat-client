import client from ".";

export const getUsers = async (wsId: number) => {
  const response = await client.get(`/users/${wsId}`);
  return response.data;
};
