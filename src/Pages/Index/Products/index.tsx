import React, { useState } from 'react'
import { useNavigate, Link, useLoaderData, Outlet } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineArrowLeft, AiOutlineDelete, AiOutlineEye, AiOutlineLink, AiOutlineSearch } from 'react-icons/ai'

import { indexProducts, getProduct, deleteProduct, type ProductInterface } from '../../../firebase/collections/products'

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

  const removeProduct = async (uuid: string): Promise<void> => {
    if (confirm(`deseja mesmo excluir o produto ${uuid}?`)) {
      await deleteProduct(uuid)
        .then(() => {
          setProducts(products.filter(product => product.uuid !== uuid))
          alert('produto excluido com sucesso!')
        })
        .catch((e: string) => { alert(`erro ao excluir produto:\n${e}`) })
    }
  }

  return (
    <Div flexDirection='column'>
      <Div justifyContent='space-between'>
        <Button
          onClick={() => { navigate(-1) }}
          elementWidth={'25px'}
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
            borderTopRightRadius='inherit'
            borderBottomRightRadius='inherit'
            {...register('uuid', { min: 1 })}
            />
            <Button
              type="submit"
              elementWidth='25px'
              margin='10px 0'
              borderTopLeftRadius='inherit'
              borderBottomLeftRadius='inherit'
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
                <td>
                  <Div justifyContent='space-around' alignItems='baseline'>
                    <Link to={product.uuid} title='Detalhes'>
                      <AiOutlineEye size={20} />
                    </Link>
                    <AiOutlineDelete
                      size={20}
                      cursor='pointer'
                      onClick={async () => { await removeProduct(product.uuid) }}
                      title='Excluir Produto'
                    />
                  </Div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Outlet />
    </Div>
  )
}

export default Product
