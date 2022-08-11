import { BaseInterface } from '@fe/constants'
import { Provider } from 'jotai'
import { ReactNode } from 'react'

interface GlobalStateProviderProps extends BaseInterface {
  children: ReactNode
}

export function GlobalStateProvider(props: GlobalStateProviderProps) {
  const { children } = props
  return <Provider>{children}</Provider>
}
