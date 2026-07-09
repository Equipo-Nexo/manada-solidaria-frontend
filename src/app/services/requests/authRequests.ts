import type { Role } from "../../types/User.types"

export type LoginRequest = {
  authorization: string
}

export type SignupRequest = {
  username: string
  password: string
  repeatedPassword: string
  email: string
  roles?: Role[]
}