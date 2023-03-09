import React, { useState } from 'react'
import { useNavigate, Link, useLoaderData } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineArrowLeft, AiOutlineLink, AiOutlineSearch } from 'react-icons/ai'

import { indexProducts, getProduct, type ProductInterface } from '../../../firebase/collections/products'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Div from '../../../components/Div'
import Table from '../../../components/Table'

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
    <Div flexDirection='column'>
      <Div justifyContent='space-between'>
        <Button
          onClick={() => { navigate(-1) }}
          elementWidth={'20px'}
        >
          <AiOutlineArrowLeft size={20} />
        </Button>
        <form onSubmit={ handleSubmit(search) }>
          <Div>
            <h3>Pesquisar:</h3>
            <Input
            type='text'
            placeholder='identificação do produto'
            margin='10px 0 10px 5px'
            {...register('uuid', { min: 1 })}
            />
            <Button
              type="submit"
              elementWidth='20px'
              margin='10px 0'
            >
              <AiOutlineSearch/>
            </Button>
          </Div>
          {(Boolean(errors.uuid)) && <span>This field is required</span>}
        </form>
      </Div>
      <br />
      <Table>
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
      </Table>
    </Div>
  )
}

export default Product
