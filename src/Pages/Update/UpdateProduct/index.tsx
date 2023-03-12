import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { saveProduct, type ProductInterface } from '../../../firebase/collections/products'

import Button from '../../../components/Button'
import Div from '../../../components/Div/index'
import Input from '../../../components/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import Select from '../../../components/Select'
import { indexStores, type StoreInterface } from '../../../firebase/collections/stores'
import Form from '../../../components/Form'

const UpdateProduct = (): any => {
  const products = useLoaderData() as ProductInterface[]
  const product = products[0]
  const [stores, setStores] = useState<StoreInterface[]>([])
  const [storeId, setStoreId] = useState<string>(product.storeId)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<ProductInterface>({
    defaultValues: {
      storeId: product.storeId,
      name: product.name,
      weight: product.weight,
      price: product.price,
      stock: product.stock
    }
  })

  useEffect(() => {
    const fetchStores = async (): Promise<any> => {
      setStores(await indexStores())
    }

    void fetchStores()
  }, [])

  const update: SubmitHandler<ProductInterface> = async (data): Promise<void> => {
    data.uuid = product.uuid

    await saveProduct(data)
      .then(() => { alert('produto editado com sucesso') })
      .catch((e: string) => { alert(`erro ao editar produto:\n${e}`) })
  }

  return (
    <Div flexDirection='column'>
      <Button
        onClick={() => { navigate(-1) }}
        elementWidth={'20px'}
        margin='10px auto 10px 10px'
      >
        <AiOutlineArrowLeft size={20} />
      </Button>
      <br/>
      <Form onSubmit={ handleSubmit(update) }>
        <Select value={storeId} margin='0' {...register('storeId', { required: true })} onChange={e => { setStoreId(e.target.value) }}>
          <option value=''>loja pertencente</option>
          {stores.map((store, key) => (
            <option key={key} value={store.uuid}>{store.name}</option>
          ))}
        </Select>
        {(Boolean(errors.storeId)) && <span>This field is required</span>}
        <br/>
        <Input margin='0' type="text" placeholder='nome do produto' {...register('name', { required: true })} />
        {(Boolean(errors.name)) && <span>This field is required</span>}
        <br/>
        <Input margin='0' type="number" placeholder='peso do produto' {...register('weight', { required: true, min: 0.1 })} />
        {(Boolean(errors.weight)) && <span>This field is required</span>}
        <br/>
        <Input margin='0' type="number" placeholder='preço do produto' {...register('price', { required: true, min: 0.1 })} />
        {(Boolean(errors.price)) && <span>This field is required</span>}
        <br/>
        <Input margin='0' type="number" placeholder='estoque do produto' {...register('stock', { required: true, min: 0 })} />
        {(Boolean(errors.stock)) && <span>This field is required</span>}
        <br/>
        <Button type='submit' backgroundColor={'rgba(80, 170, 100, 1)'}>editar produto</Button>
      </Form>
    </Div>
  )
}

export default UpdateProduct
