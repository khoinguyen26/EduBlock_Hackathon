import { NormalLayout } from '@fe/components'
import { App, Home } from '@fe/pages'
import { Navigate, RouteObject } from 'react-router-dom'

export const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <NormalLayout />,
        children: [
          {
            index: true,
            element: <Home />
          }
        ]
      },
      {
        index: true,
        // path: 'auth',
        // element: 'auth',
        // TODO: REMOVE
        element: <Navigate to={'home'} />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]
