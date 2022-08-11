import { BaseInterface } from '@fe/constants'
import {
  useQueries as useRQQueries,
  useQuery as useRQQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'

interface UseQueryProps extends BaseInterface {
  options: UseQueryOptions
}

export function useQuery(props: UseQueryProps): UseQueryResult {
  const { options } = props
  const query = useRQQuery({ ...options })

  return query
}

interface UseMultipleQueryProps extends BaseInterface {
  queriesOptions: UseQueryOptions[]
}

export function useMultipleQuery(
  props: UseMultipleQueryProps
): UseQueryResult[] {
  const { queriesOptions } = props

  const queries = useRQQueries({
    queries: queriesOptions
  })

  return queries
}
