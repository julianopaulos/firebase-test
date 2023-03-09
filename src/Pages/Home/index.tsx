import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Div from '../../components/Div'

const Home = (): any => {
  return (
    <>
      <Div justifyContent='space-around'>
        <h3>
          <Link to={'product'}> Cadastrar produto </Link>
        </h3>
        <h3>
          <Link to={'products'}> Listar Produtos </Link>
        </h3>
        <h3>
          <Link to={'store'}> Cadastrar loja </Link>
        </h3>
        <h3>
          <Link to={'stores'}> Listar lojas </Link>
        </h3>
      </Div>
      <Outlet />
    </>
  )
}

export default Home
