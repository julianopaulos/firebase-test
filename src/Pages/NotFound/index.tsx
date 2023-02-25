import React from 'react'
import { useNavigate } from 'react-router-dom'

const Product = (): any => {
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => { navigate(-1) }} >
        voltar
      </button>
      <h1>Ops</h1>
    </div>
  )
}

export default Product
