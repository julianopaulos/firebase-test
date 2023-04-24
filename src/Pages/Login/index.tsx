import React, { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Div from '../../components/Div'
import Form from '../../components/Form'
import Input from '../../components/Input'
import firebaseAuthErrorCodes from '../../firebase/auth_errors'
import { loginUser, type UserInterface, type AuthError } from '../../firebase/collections/users'
import LoginError from '../../components/LoginError'

const Login = (): any => {
  const navigate = useNavigate()

  const [displayErrorMessage, setDisplayErrorMessage] = useState<string>('none')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const { register, handleSubmit, formState: { errors } } = useForm<UserInterface>()
  const login: SubmitHandler<UserInterface> = async (data: UserInterface, event): Promise<void> => {
    await loginUser(data)
      .then(resp => {
        console.log('resp', resp)
        navigate('/')
      })
      .catch((e: AuthError) => {
        setErrorMessage(e.message)
        if ((firebaseAuthErrorCodes[e.code]).length > 0) {
          setErrorMessage(firebaseAuthErrorCodes[e.code])
        }

        setDisplayErrorMessage('block')
      })

    event?.target.reset()
  }

  return (
    <Div flexDirection='column' margin='150px 0'>
      <Form onSubmit={handleSubmit(login)}>
        <Input type='email' placeholder='email' {
            ...register(
              'email',
              {
                required: 'email obrigatório',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'o email inserido é inválido'
                }
              }
            )
          }
        />
        {(errors.email != null) && <span role="alert">{errors.email.message}</span>}
        <Input
          type='password'
          placeholder='senha'
          {
            ...register(
              'password',
              {
                required: 'senha obrigatória',
                minLength: {
                  value: 5,
                  message: 'número mínimo de caracteres é 5'
                }
              }
            )
          }
        />
        {(errors.password != null) && <span role="alert">{errors.password.message}</span>}
        <Button
         backgroundColor='rgba(60, 50, 200, 1)'
         color='white'
        >
          Entrar
        </Button>
      </Form>
      <p>
        Não tem uma conta? <Link to={'register'} style={{ fontWeight: 'bold' }}> Cadastrar Usuário </Link>
      </p>
      <LoginError message={errorMessage} display={displayErrorMessage} />
    </Div>
  )
}

export default Login
