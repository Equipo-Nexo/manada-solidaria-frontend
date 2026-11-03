export function isFinalAnimalPostStatus(status: string): boolean {
  return status === 'ADOPTED' || status === 'FOUND' || status === 'RESCUED'
}
