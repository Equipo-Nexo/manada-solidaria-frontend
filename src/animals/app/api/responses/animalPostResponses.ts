import type { AnimalPost } from "../../types/AnimalPost.types";

export type AnimalPostResponse = AnimalPost

export const animalPostStatuses = [
    'CREATED',
    'SEARCHING',
    'FOUND',
    'SEARCHING_ADOPT_AND_TRANSIT',
    'SEARCHING_ADOPT',
    'ADOPTED'
] as const
export type AnimalPostStatus = typeof animalPostStatuses[number]