import React from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Router from './router'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
)
