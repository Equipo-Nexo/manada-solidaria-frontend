import { parseRewardAmount } from "@/common/utils/rewardAmount"
import type { BaseAnimalPostRequest, CreateAdoptionAnimalPostRequest, CreateLostAnimalPostRequest } from "../app/api/requests/animalPostRequests"
import type { NewAnimalPostFormValues } from "../app/schemas/CreateAnimalPost.schema"

export enum PublicationReason {
  Adoption = 'ADOPTION',
  Lost = 'LOST',
  Street = 'STREET',
  Transit = 'TRANSIT',
}

interface AnimalPostRequestBuilder {
  build(
    values: NewAnimalPostFormValues,
    commonRequest: BaseAnimalPostRequest
  ): CreateLostAnimalPostRequest | CreateAdoptionAnimalPostRequest
}

const animalPostRequestBuilders: Record<
  PublicationReason,
  AnimalPostRequestBuilder
> = {
  [PublicationReason.Lost]: {
    build: (values, commonRequest) => ({
      ...commonRequest,
      type: 'LOST',
      hasOwner: true,
      reward: parseRewardAmount(values.rewardAmount)
    }),
  },

  [PublicationReason.Street]: {
    build: (_, commonRequest) => ({
      ...commonRequest,
      type: 'LOST',
      hasOwner: false,
      reward: undefined,
    }),
  },

  [PublicationReason.Adoption]: {
    build: (_, commonRequest) => ({
      ...commonRequest,
      type: 'ADOPTION',
      inTransit: false,
    }),
  },

  [PublicationReason.Transit]: {
    build: (_, commonRequest) => ({
      ...commonRequest,
      type: 'ADOPTION',
      inTransit: true,
    }),
  },
}

export const buildRequest = (
  values: NewAnimalPostFormValues,
  commonRequest: BaseAnimalPostRequest
) => {
  return animalPostRequestBuilders[values.publicationReason].build(
    values,
    commonRequest
  )
}