import { type User } from 'firebase/auth'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { GoSignOut } from 'react-icons/go'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Div from '../../components/Div'
import { auth, checkUserSession, CurrentUser, logoutUser } from '../../firebase/collections/users'
import { AiOutlineMenu } from 'react-icons/ai'

const Home = (): any => {
  const [userLastSignInTime, setUserLastSignInTime] = useState<string | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user: User | null) => {
      if (user == null) {
        navigate('/user/login')
      } else {
        setUserLastSignInTime(user.metadata.lastSignInTime)
        void checkUserSession(userLastSignInTime)
      }
    })
  }, [CurrentUser])

  const collapseMenu = (): any => {
    const menu = document.querySelector('div.menu')
    if (menu != null) {
      let isActive = false
      menu.classList.forEach(className => {
        if (className === 'active') {
          isActive = true
          return false
        }
      })

      if (!isActive) {
        menu.classList.add('active')
      } else {
        menu.classList.remove('active')
      }
    }
  }

  return (
    <>
      <AiOutlineMenu
        style={{ marginLeft: 'auto', position: 'absolute', right: '0' }}
        size={25}
        cursor='pointer'
        onClick={collapseMenu}
      />
      <Div
        flexDirection='column'
        justifyContent='space-around'
        alignItems='center'
        className='menu'
      >
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
          <h3 style={{ display: 'flex', alignItems: 'center' }}>
            <GoSignOut cursor='pointer' color='rgba(50, 50, 150, 1)' size={20} onClick={() => { void logoutUser() }} />
          </h3>
        )}
      </Div>
      <Outlet />
      <footer style={{ bottom: '0', position: 'absolute', textAlign: 'right', width: '100%' }}>
        {(userLastSignInTime != null) && (
          <p>sessão: {moment(userLastSignInTime).local(true).format('DD/MM/YYYY HH:mm:ss')}</p>
        )}
      </footer>
    </>
  )
}

export default Home
