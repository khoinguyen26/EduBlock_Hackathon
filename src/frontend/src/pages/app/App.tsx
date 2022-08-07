import { ICProvider, ThemeProvider } from '@fe/providers'
import { Outlet } from 'react-router-dom'
export function App() {
  return (
    <ICProvider>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </ICProvider>
  )
}
