import { type User } from 'firebase/auth'
import React, { useEffect } from 'react'
import { Link, Outlet, redirect } from 'react-router-dom'
import Div from '../../components/Div'
import { auth, CurrentUser } from '../../firebase/collections/users'

const Home = (): any => {
  useEffect(() => {
    console.log('CurrentUser', CurrentUser)
    auth.onAuthStateChanged((user: User | null) => {
      if (user == null) {
        redirect('/user/login')
      } else {
        const userData = user.toJSON()
        console.log('userData', userData, user.accessToken)
      }
    })
  }, [CurrentUser])
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
