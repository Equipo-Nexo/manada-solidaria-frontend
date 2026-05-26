import type { Post } from '../types/Post'
import { apiFetch } from './api'

export function getPosts(): Promise<Post[]> {
  return apiFetch<Post[]>('/posts')
}
