import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { type ProductInterface } from '../../../firebase/collections/products'

import Button from '../../../components/Button'
import Table from '../../../components/Table'

const ProductDetails = (): any => {
  const products = useLoaderData() as ProductInterface[]
  const navigate = useNavigate()

  return (
    <div className="App">
      <Button
        onClick={() => { navigate(-1) }}
        elementWidth={'20px'}
      >
        <AiOutlineArrowLeft size={20} />
      </Button>
      <Table>
        <thead>
          <tr>
            <th>identificação da loja</th>
            <th>identificação</th>
            <th>nome</th>
            <th>peso</th>
            <th>preço</th>
            <th>estoque</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: ProductInterface, key: any) => {
            return (
              <tr key={key}>
                  <td>{product.storeId}</td>
                  <td>{product.uuid}</td>
                  <td>{product.name}</td>
                  <td>{product.weight}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default ProductDetails
