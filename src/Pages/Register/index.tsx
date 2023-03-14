import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Div from '../../components/Div'
import Form from '../../components/Form'
import Input from '../../components/Input'

const Register = (): any => {
  const navigate = useNavigate()

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
      <Form>
        <Input type='email' name='email' placeholder='email' />
        <Input type='password' name='password' placeholder='senha'/>
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
