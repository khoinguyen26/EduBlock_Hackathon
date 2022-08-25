import { BaseInterface } from '@fe/constants'
import { usePersistentState } from '@fe/hooks/index'
import {
  useMutation as useRQMutation,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'
import { request, RequestProps } from './request'

interface UseMutationProps extends BaseInterface {
  options: UseMutationOptions
  requestOptions: RequestProps
}

export function useMutation(props: UseMutationProps): UseMutationResult {
  const { options, requestOptions } = props
  const {
    state: {
      token: { value: token }
    }
  } = usePersistentState({
    store: 'account'
  })

  const mutation = useRQMutation({
    mutationFn: (variables) => request({ token, ...requestOptions }),
    ...options
  })

  return mutation
}
