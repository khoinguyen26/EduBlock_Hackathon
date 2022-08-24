import { LocalizationProvider as Provider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { BaseInterface } from '@fe/constants'
import { ReactNode } from 'react'

interface LocalizationProviderProps extends BaseInterface {
  children: ReactNode
}

export function LocalizationProvider(props: LocalizationProviderProps) {
  const { children } = props
  return <Provider dateAdapter={AdapterDateFns}>{children}</Provider>
}
