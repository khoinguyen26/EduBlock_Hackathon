import { BaseInterface } from '@fe/constants'
import { usePersistentState } from '@fe/hooks'
import {
  useQueries as useRQQueries,
  useQuery as useRQQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import { request, RequestProps } from './request'

interface UseQueryProps extends BaseInterface {
  options: UseQueryOptions
  requestOptions: RequestProps
}

export function useQuery(props: UseQueryProps): UseQueryResult {
  const { options, requestOptions } = props

  const {
    state: {
      token: { value: token }
    }
  } = usePersistentState({
    store: 'account'
  })

  const query = useRQQuery({
    queryFn: (context) => request({ token, ...requestOptions }),
    ...options
  })

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
