import React, { useState } from 'react'
import { useNavigate, Link, useLoaderData } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineArrowLeft, AiOutlineLink, AiOutlineSearch } from 'react-icons/ai'

import { indexProducts, getProduct, type ProductInterface } from '../../../firebase/collections/products'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Div from '../../../components/Div'

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
      <Button
        onClick={() => { navigate(-1) }}
        elementWidth={'20px'}
      >
        <AiOutlineArrowLeft size={20} />
      </Button>
      <form onSubmit={ handleSubmit(search) }>
        <h3>Produto:</h3>
        <Div>
          <Input
           type='text'
           placeholder='identificação do produto'
           margin='10px 0'
           borderTopRightRadius='0'
           borderBottomRightRadius='0'
           {...register('uuid', { min: 1 })}
          />
          <Button
            type="submit"
            elementWidth='20px'
            borderTopLeftRadius='0'
            borderBottomLeftRadius='0'
            margin='10px 0'
          >
            <AiOutlineSearch/>
          </Button>
        </Div>
        {(Boolean(errors.uuid)) && <span>This field is required</span>}
      </form>
      <h3>Produtos:</h3>
      <table>
        <thead>
          <tr>
            <th>identificação da loja</th>
            <th>identificação do produto</th>
            <th>nome do produto</th>
            <th><AiOutlineLink /></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, key) => {
            return (
              <tr key={key}>
                <td>{product.storeId}</td>
                <td>{product.uuid}</td>
                <td>{product.name}</td>
                <td><Link to={product.uuid}>Detalhes</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Product
