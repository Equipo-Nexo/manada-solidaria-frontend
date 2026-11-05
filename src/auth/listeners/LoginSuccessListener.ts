import { createListenerMiddleware } from '@reduxjs/toolkit'
import { loginSuccess } from '@common/app/store/authSlice'
import { usersApi } from '@users/app/api/usersApi'

export const loginSuccessListener = createListenerMiddleware()

loginSuccessListener.startListening({
  actionCreator: loginSuccess,
  effect: async (_, listenerApi) => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          await listenerApi.dispatch(
            usersApi.endpoints.putUserLocation.initiate({
              latitude: coords.latitude,
              longitude: coords.longitude,
            })
          ).unwrap()
        } catch (error) {
          console.error('Error updating user location:', error)
        }
      },
      (error) => {
        console.warn('Could not get user location:', error)
      }
    )
  },
})