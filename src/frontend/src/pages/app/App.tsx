import {
  GlobalStateProvider,
  ICProvider,
  ThemeProvider,
  QueryClientProvider,
  LocalizationProvider
} from '@fe/providers'
import { Outlet } from 'react-router-dom'

export function App() {
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
