import { type User } from 'firebase/auth'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { GoSignOut } from 'react-icons/go'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Div from '../../components/Div'
import { auth, checkUserSession, CurrentUser, logoutUser } from '../../firebase/collections/users'

const Home = (): any => {
  const [userLastSignInTime, setUserLastSignInTime] = useState<string | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      if (user == null) {
        navigate('/user/login')
      } else {
        setUserLastSignInTime(user.metadata.lastSignInTime)
        void checkUserSession(user.metadata.lastSignInTime)
      }
    })
  }, [CurrentUser])

  return (
    <>
      <Div justifyContent='space-around' alignItems='center'>
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
        {(userLastSignInTime != null) && (
          <h3><GoSignOut cursor='pointer' color='rgba()' onClick={() => { void logoutUser() }} /></h3>
        )}
      </Div>
      <Outlet />
      <footer style={{ bottom: '0', position: 'absolute', textAlign: 'right', width: '100%' }}>
        {(userLastSignInTime != null) && (
          <h3>Logado desde {moment(userLastSignInTime).local(true).format('DD/MM/YYYY HH:mm:ss')}</h3>
        )}
      </footer>
    </>
  )
}

export default Home
