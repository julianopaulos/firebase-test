import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { type ProductInterface, saveProduct } from '../../../firebase/collections/products'
import { type StoreInterface, indexStores } from '../../../firebase/collections/stores'

import Input from '../../../components/Input'
import Button from '../../../components/Button/index'
import Select from '../../../components/Select'
import Div from '../../../components/Div'
import Form from '../../../components/Form'

const Product = (): any => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductInterface>({
    defaultValues: {
      uuid: uuidv4()
    }
  })

  const [stores, setStores] = useState<StoreInterface[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchStores = async (): Promise<any> => {
      setStores(await indexStores())
    }

    void fetchStores()
  }, [])

  const save: SubmitHandler<ProductInterface> = async (data, event): Promise<void> => {
    await saveProduct(data)
      .then(() => { alert('produto salvo com sucesso') })
      .catch((e: string) => { alert(`erro ao salvar produto:\n${e}`) })

    event?.target.reset()
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
      <Form onSubmit={ handleSubmit(save) }>
        <Input margin='0' type="text" defaultValue={uuidv4()} {...register('uuid', { required: true })} disabled />
        <br/>
        <Select placeholder='loja pertencente' margin='0' {...register('storeId', { required: true })}>
          <option></option>
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
        <Button type='submit' backgroundColor={'rgba(80, 170, 100, 1)'}>criar produto</Button>
      </Form>
    </Div>
  )
}

export default Product
