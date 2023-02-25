import React, { useState } from 'react'
import { getProduct, type ProductInterface } from '../../../firebase/collections/products'
import { useNavigate } from 'react-router-dom'

const ProductDetails = (): any => {
  const [products, setProducts] = useState<ProductInterface[]>([])
  const navigate = useNavigate()

  async function handleSeach (uuid: string): Promise<void> {
    setProducts(await getProduct(uuid))
  }

  return (
    <div className="App">
      <button onClick={() => { navigate(-1) }} >
        voltar
      </button>
      <h3>Produto:</h3>
      <input type='text' name='uuid' placeholder='identificação do produto' onChange={ (e) => { void handleSeach(e.target.value) }} />
      {products?.map((product, key) => {
        return (
            <ul key={key}>
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
