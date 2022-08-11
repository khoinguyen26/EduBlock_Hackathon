import {
  GlobalStateProvider,
  ICProvider,
  ThemeProvider,
  QueryClientProvider
} from '@fe/providers'
import { Outlet } from 'react-router-dom'

export function App() {
  return (
    <QueryClientProvider>
      <GlobalStateProvider>
        <ICProvider>
          <ThemeProvider>
            <Outlet />
          </ThemeProvider>
        </ICProvider>
      </GlobalStateProvider>
    </QueryClientProvider>
  )
}
