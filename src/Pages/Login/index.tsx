import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Div from '../../components/Div'
import Form from '../../components/Form'
import Input from '../../components/Input'
import firebaseAuthErrorCodes from '../../firebase/auth_errors'
import { loginUser, type UserInterface, type AuthError } from '../../firebase/collections/users'

const Login = (): any => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<UserInterface>()
  const login: SubmitHandler<UserInterface> = async (data: UserInterface, event): Promise<void> => {
    await loginUser(data)
      .then(resp => {
        console.log('resp', resp)
        alert('autenticado com sucesso!')
      })
      .catch((e: AuthError) => {
        let errorMessage = ''
        if ((firebaseAuthErrorCodes[e.code]).length > 0) {
          errorMessage = firebaseAuthErrorCodes[e.code]
        }

        alert(`erro ao entrar \n${errorMessage}`)
      })

    event?.target.reset()
  }

  return (
    <Div flexDirection='column'>
      <Button
        onClick={() => { navigate(-1) }}
        elementWidth={'20px'}
        margin='10px auto 10px 10px'
      >
        <AiOutlineArrowLeft size={20} />
      </Button>
      <br/>
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
    </Div>
  )
}

export default Login
