import type { LoginInputs, RegisterInputs } from '..'
import client from '.'

export async function login(user: LoginInputs) {
  const response = await client.post('/signin', user)
  return response.data
}

export async function register(user: RegisterInputs) {
  const response = await client.post('/signup', user)
  return response.data
}
