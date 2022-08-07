import { ThemeProvider } from '@fe/providers'
import { Outlet } from 'react-router-dom'
export function App() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  )
}
