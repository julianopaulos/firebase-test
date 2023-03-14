import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { indexProducts, getProduct } from './firebase/collections/products'
import { indexStores, getStore } from './firebase/collections/stores'

import NotFound from './Pages/NotFound'
import Home from './Pages/Home'
import Product from './Pages/Save/Product'
import Store from './Pages/Save/Store'
import Products from './Pages/Index/Products'
import ProductDetails from './Pages/Show/ProductDetails'
import Stores from './Pages/Index/Stores'
import StoreDetails from './Pages/Show/StoreDetails'
import UpdateProduct from './Pages/Update/UpdateProduct'
import UpdateStore from './Pages/Update/UpdateStore'
import Register from './Pages/Register'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'product',
        element: <Product />,
        errorElement: <NotFound />
      },
      {
        path: 'products',
        element: <Products />,
        errorElement: <NotFound />,
        loader: indexProducts
      },
      {
        path: 'products/:uuid',
        element: <ProductDetails />,
        errorElement: <NotFound />,
        loader: async ({ params }) => {
          const uuid: string = params.uuid ?? ''
          return await getProduct(uuid)
        }
      },
      {
        path: 'products/:uuid/patch',
        element: <UpdateProduct />,
        errorElement: <NotFound />,
        loader: async ({ params }) => {
          const uuid: string = params.uuid ?? ''
          return await getProduct(uuid)
        }
      },
      {
        path: 'store',
        element: <Store />,
        errorElement: <NotFound />
      },
      {
        path: 'stores',
        element: <Stores />,
        errorElement: <NotFound />,
        loader: indexStores
      },
      {
        path: '/stores/:uuid',
        element: <StoreDetails />,
        errorElement: <NotFound />,
        loader: async ({ params }) => {
          const uuid: string = params.uuid ?? ''
          return await getStore(uuid)
        }
      },
      {
        path: '/stores/:uuid/patch',
        element: <UpdateStore />,
        errorElement: <NotFound />,
        loader: async ({ params }) => {
          const uuid: string = params.uuid ?? ''
          return await getStore(uuid)
        }
      },
      {
        path: '/user/register',
        element: <Register />,
        errorElement: <NotFound />
      }
    ]
  }
])

export default Router
