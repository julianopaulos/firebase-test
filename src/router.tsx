import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import NotFound from './Pages/NotFound'
import Home from './Pages/Home'
import Product from './Pages/Save/Product'
import Store from './Pages/Save/Store'
import Products from './Pages/Index/Products'
import ProductDetails from './Pages/Show/Product'

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
    path: '/product/show',
    element: <ProductDetails />,
    errorElement: <NotFound />
  },
  {
    path: '/products',
    element: <Products />,
    errorElement: <NotFound />
  },
  {
    path: '/store',
    element: <Store />,
    errorElement: <NotFound />
  }
])

export default Router
