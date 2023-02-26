import React, { useState } from 'react'
import { getProduct, type ProductInterface } from '../../../firebase/collections/products'
import { useNavigate } from 'react-router-dom'

const ProductDetails = (): any => {
  const [uuid, setUuid] = useState<string>('')
  const [products, setProducts] = useState<ProductInterface[]>([])
  const navigate = useNavigate()

  async function handleSeach (): Promise<void> {
    setProducts(await getProduct(uuid))
  }

  return (
    <div className="App">
      <button onClick={() => { navigate(-1) }} >
        voltar
      </button>
      <h3>Produto:</h3>
      <input type='text' name='uuid' placeholder='identificação do produto' onChange={ (e) => { setUuid(e.target.value) }} />
      <button onClick={ () => { void handleSeach() } }>Buscar</button>
      {products?.map((product, key) => {
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
