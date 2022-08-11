import { BaseInterface } from '@fe/constants'
import { createTheme, ThemeProvider as Provider } from '@mui/material'
import { ReactNode } from 'react'

interface ThemeProviderProps extends BaseInterface {
  children: ReactNode
}

const theme = createTheme()

export function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props
  return <Provider theme={theme}>{children}</Provider>
}
