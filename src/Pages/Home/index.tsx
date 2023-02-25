import React from 'react'
import { Link } from 'react-router-dom'

const Home = (): any => {
  return (
    <div>
        <h3>
          Cadastrar produto: <Link to={'product'}> Aqui </Link>
        </h3>
        <h3>
          Cadastrar loja: <Link to={'store'}> Aqui </Link>
        </h3>
    </div>
  )
}

export default Home
