import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

import { type ProductInterface } from '../../../firebase/collections/products'

import Button from '../../../components/Button'

const ProductDetails = (): any => {
  const products = useLoaderData() as ProductInterface[]
  const navigate = useNavigate()

  return (
    <div className="App">
      <Button onClick={() => { navigate(-1) }} >
        voltar
      </Button>
      {products?.map((product: ProductInterface, key: any) => {
        return (
            <ul key={key}>
                <li><b>identificação da loja</b>: {product.storeId}</li>
                <li><b>identificação</b>: {product.uuid}</li>
                <li><b>nome</b>: {product.name}</li>
                <li><b>peso</b>: {product.weight}</li>
                <li><b>preço</b>: {product.price}</li>
                <li><b>estoque</b>: {product.stock}</li>
            </ul>
        )
      })}
    </div>
  )
}

export default ProductDetails
