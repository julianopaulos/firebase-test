import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button/index'

const Product = (): any => {
  const navigate = useNavigate()
  return (
    <div>
      <Button onClick={() => { navigate(-1) }} >
        voltar
      </Button>
      <h1>Ops!</h1>
    </div>
  )
}

export default Product
