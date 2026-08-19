import type { EditPersonalDataRequest } from '../requests/EditPersonalDataRequest'

type PersonalDataMock = EditPersonalDataRequest & {
  username: string
}

export const personalDataMock: PersonalDataMock = {
  username: 'Abril',
  name: 'Abril',
  lastname: 'Conrero',
  email: 'abrilconrero@example.com',
  phoneNumber: '3534182076',
  profileImageURL: '/pwa-192.png',
}
