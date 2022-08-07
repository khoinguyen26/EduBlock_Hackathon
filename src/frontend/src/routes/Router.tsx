import { BrowserRouter, useRoutes } from 'react-router-dom'
import { ROUTES } from './routes'

function Routes() {
  const routes = useRoutes(ROUTES)
  return routes
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}
