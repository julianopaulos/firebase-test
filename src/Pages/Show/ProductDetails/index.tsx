import React, { useState } from 'react'
import { getProduct, type ProductInterface } from '../../../firebase/collections/products'
import { useNavigate } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

const ProductDetails = (): any => {
  const [products, setProducts] = useState<ProductInterface[]>([])
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<ProductInterface>()

  const search: SubmitHandler<ProductInterface> = async (data, event): Promise<void> => {
    setProducts(await getProduct(data.uuid))

    if (products.length === 0) {
      alert('nenhum produto com essa identificação')
    }

    event?.target.reset()
  }

  return (
    <div className="App">
      <Button onClick={() => { navigate(-1) }} >
        voltar
      </Button>
      <form onSubmit={ handleSubmit(search) }>
        <h3>Produto:</h3>
        <Input type='text' placeholder='identificação do produto' {...register('uuid', { required: true })} />
        {(Boolean(errors.uuid)) && <span>This field is required</span>}
        <Button type="submit">Buscar</Button>
      </form>
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
