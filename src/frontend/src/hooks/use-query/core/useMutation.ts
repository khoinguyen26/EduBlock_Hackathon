import { BaseInterface } from '@fe/constants'
import {
  useMutation as useRQMutation,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query'

interface UseMutationProps extends BaseInterface {
  options: UseMutationOptions
}

export function useMutation(props: UseMutationProps): UseMutationResult {
  const { options } = props

  const mutation = useRQMutation({ ...options })

  return mutation
}
