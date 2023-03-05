import React, { useState } from 'react'
import { useNavigate, Link, useLoaderData } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { indexProducts, getProduct, type ProductInterface } from '../../../firebase/collections/products'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

const Product = (): any => {
  const [products, setProducts] = useState<ProductInterface[]>(useLoaderData() as ProductInterface[])
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductInterface>()

  const search: SubmitHandler<ProductInterface> = async (data, event): Promise<void> => {
    if (data.uuid.length === 0) {
      setProducts(await indexProducts())
      reset()

      return
    }

    setProducts(await getProduct(data.uuid))

    if (products.length === 0) {
      alert('nenhum produto com essa identificação')
    }

    event?.target.reset()
    reset()
  }

  return (
    <div className="App">
      <Button onClick={() => { navigate(-1) }} >
        voltar
      </Button>
      <form onSubmit={ handleSubmit(search) }>
        <h3>Produto:</h3>
        <Input type='text' placeholder='identificação do produto' {...register('uuid', { min: 1 })} />
        {(Boolean(errors.uuid)) && <span>This field is required</span>}
        <Button type="submit">Buscar</Button>
      </form>
      <h3>Produtos:</h3>
      {products?.map((product, key) => {
        return (
            <ul key={key}>
                <li><b>identificação da loja</b>: {product.storeId}</li>
                <li><b>identificação</b>: {product.uuid}</li>
                <li><b>nome</b>: {product.name}</li>
                <li><Link to={product.uuid}>Detalhes</Link></li>
                <br/>
            </ul>
        )
      })}
    </div>
  )
}

export default Product
