import { useQueryClient as useRQClient } from '@tanstack/react-query'

export function useQueryClient() {
  const client = useRQClient()

  return client
}
