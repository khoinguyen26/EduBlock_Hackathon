import {
  GlobalStateProvider,
  ICProvider,
  LocalizationProvider,
  QueryClientProvider,
  ThemeProvider
} from '@fe/providers'
import { Router } from '@fe/routes'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import '@connect2ic/core/style.css'
import '@fe/styles.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider>
      <GlobalStateProvider>
        <ICProvider>
          <LocalizationProvider>
            <ThemeProvider>
              {/* <Outlet /> */}
              <Router />
            </ThemeProvider>
          </LocalizationProvider>
        </ICProvider>
      </GlobalStateProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
