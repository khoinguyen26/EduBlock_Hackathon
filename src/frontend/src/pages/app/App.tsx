import { usePersistentState } from '@fe/hooks'
import {
  GlobalStateProvider,
  ICProvider,
  LocalizationProvider,
  QueryClientProvider,
  ThemeProvider
} from '@fe/providers'
import { defaultAccountValue } from '@fe/storages/atoms/persistentAtoms'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export function App() {
  const { setState: setAccount } = usePersistentState({
    store: 'account'
  })

  useEffect(() => {
    setAccount(defaultAccountValue)
  }, [])

  return (
    <QueryClientProvider>
      <GlobalStateProvider>
        <ICProvider>
          <LocalizationProvider>
            <ThemeProvider>
              <Outlet />
            </ThemeProvider>
          </LocalizationProvider>
        </ICProvider>
      </GlobalStateProvider>
    </QueryClientProvider>
  )
}
