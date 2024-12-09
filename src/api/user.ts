import client from '.'

export async function getUsers(wsId: number) {
  const response = await client.get(`/users/${wsId}`)
  return response.data
}
