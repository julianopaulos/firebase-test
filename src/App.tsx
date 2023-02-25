import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Product from './Pages/Save/Product'

const App = (): any => {
  return (
    <Routes>
      <Route path='/' element={ <Product/> }/>
    </Routes>
  )
}

export default App
