import React from 'react'
import Div from '../Div'

interface LoginErrorInterface {
  message: string
  display: string
}

const LoginError = (props: LoginErrorInterface): any => {
  return (
    <Div
      backgroundColor='rgb(190, 80, 80)'
      elementWidth='250px'
      borderRadius='12px'
      padding='10px 15px'
      boxShadow='2px 4px 2px rgb(165, 146, 146)'
      margin='20px'
      textColor='rgb(225, 225, 225)'
      fontSize='1.2em'
      lineHeight='1.5em'
      style={{ bottom: '0px', position: 'fixed', right: '0px', textAlign: 'center' }}
      display={props.display}
    >
      {props.message}
    </Div>
  )
}

export default LoginError
