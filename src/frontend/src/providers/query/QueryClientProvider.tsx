import {
  QueryClient,
  QueryClientProvider as Provider,
  QueryClientProviderProps as ProviderProps
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

import { BaseInterface } from '@fe/constants'

const queryClient = new QueryClient()

interface QueryClientProviderProps extends BaseInterface {
  children: ReactNode
  providerProps?: ProviderProps
}

export function QueryClientProvider(props: QueryClientProviderProps) {
  const { children, providerProps } = props

  return (
    <Provider
      client={queryClient}
      {...providerProps}
    >
      {children}
      <ReactQueryDevtools />
    </Provider>
  )
}
