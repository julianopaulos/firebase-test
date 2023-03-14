import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Div from '../../components/Div'
import Form from '../../components/Form'
import Input from '../../components/Input'
import { createNewUser, type UserInterface } from '../../firebase/collections/users'

const Register = (): any => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<UserInterface>()

  const save: SubmitHandler<UserInterface> = async (data: UserInterface, event): Promise<void> => {
    console.log('data', data)
    await createNewUser(data)
      .then(resp => {
        console.log('resp', resp)
        alert('perfil criado com sucesso!')
      })
      .catch((e: string) => {
        alert(`erro ao cadastrar \n${e}`)
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
      <Form onSubmit={handleSubmit(save)}>
        <Input type='email' placeholder='email' {
            ...register(
              'email',
              {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format'
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
                required: 'required',
                minLength: {
                  value: 5,
                  message: 'min length is 5'
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
          Cadastrar
        </Button>
      </Form>
    </Div>
  )
}

export default Register
