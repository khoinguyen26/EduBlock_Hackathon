import { BrowserRouter, useRoutes } from 'react-router-dom'
import { getRoutes } from './routes'

function Routes() {
  const routes = getRoutes({ role: 'guest' })
  const RouteComponents = useRoutes(routes)
  return RouteComponents
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}
