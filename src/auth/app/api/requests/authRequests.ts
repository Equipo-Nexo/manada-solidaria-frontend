import type { Role } from "@users/app/types/User.types"
import type { PhoneNumber } from '@/common/app/services/responses/PhoneNumber'

export type LoginRequest = {
  authorization: string
}

export type SignupRequest = {
  username: string
  password: string
  repeatedPassword: string
  email: string
  phoneNumber?: PhoneNumber
  roles?: Role[]
}
