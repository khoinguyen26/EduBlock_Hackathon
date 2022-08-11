import * as backend from '@be/backend'
import { createClient } from '@connect2ic/core'
import { defaultProviders } from '@connect2ic/core/providers'
import { Connect2ICProvider as Provider } from '@connect2ic/react'
import { ReactNode } from 'react'

import { BaseInterface } from '@fe/constants'

const client = createClient({
  providers: defaultProviders,
  canisters: { backend }
})

interface ICProviderProps extends BaseInterface {
  children: ReactNode
}

export function ICProvider(props: ICProviderProps) {
  const { children } = props
  return <Provider client={client}>{children}</Provider>
}
