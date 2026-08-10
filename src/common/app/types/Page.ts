type SortMetadata = {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export type Page<T> = {
  content: T[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: SortMetadata
    unpaged: boolean
  }
  size: number
  sort: SortMetadata
  totalElements: number
  totalPages: number
}