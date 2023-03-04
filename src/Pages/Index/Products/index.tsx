import React, { useEffect, useState } from 'react'
import { indexProducts, type ProductInterface } from '../../../firebase/collections/products'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'

const Product = (): any => {
  const [products, setProducts] = useState<ProductInterface[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async (): Promise<any> => {
      setProducts(await indexProducts())
    }

    void fetchProducts()
  }, [])

  return (
    <div className="App">
      <Button onClick={() => { navigate(-1) }} >
        voltar
      </Button>
      <h3>Produtos:</h3>
      {products?.map((product, key) => {
        return (
            <ul key={key}>
                <li><b>identificação da loja</b>: {product.storeId}</li>
                <li><b>identificação</b>: {product.uuid}</li>
                <li><b>nome</b>: {product.name}</li>
                <li><b>peso</b>: {product.weight}</li>
                <li><b>preço</b>: {product.price}</li>
                <li><b>estoque</b>: {product.stock}</li>
                <br/>
            </ul>
        )
      })}
    </div>
  )
}

export default Product
