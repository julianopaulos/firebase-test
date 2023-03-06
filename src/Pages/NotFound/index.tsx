import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button/index'

const Product = (): any => {
  const navigate = useNavigate()
  return (
    <div>
      <Button
        onClick={() => { navigate(-1) }}
        Elementwidth={'20px'}
      >
        <AiOutlineArrowLeft size={20} />
      </Button>
      <h1>Ops!</h1>
    </div>
  )
}

export default Product
