import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Home = (): any => {
  return (
    <div>
        <h3>
          Cadastrar produto:
          <Link to={'product'}> Aqui </Link>
        </h3>
        <h3>
          Listar Produtos:
          <Link to={'products'}> Aqui </Link>
        </h3>
        <h3>
          Filtrar Produto por identificação:
          <Link to={'product/show'}> Aqui </Link>
        </h3>
        <h3>
          Cadastrar loja:
          <Link to={'store'}> Aqui </Link>
        </h3>
        <h3>
          Listar lojas:
          <Link to={'stores'}> Aqui </Link>
        </h3>
        <h3>
          Filtrar Loja por identificação:
          <Link to={'store/show'}> Aqui </Link>
        </h3>
        <Outlet />
    </div>
  )
}

export default Home
