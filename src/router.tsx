import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import NotFound from './Pages/NotFound'
import Home from './Pages/Home'
import Product from './Pages/Save/Product'
import Store from './Pages/Save/Store'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/product',
    element: <Product />,
    errorElement: <NotFound />
  },
  {
    path: '/store',
    element: <Store />,
    errorElement: <NotFound />
  }
])

export default Router
