import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { type ProductInterface, saveProduct } from '../../../firebase/collections/products'
import { type StoreInterface, indexStores } from '../../../firebase/collections/stores'
import Input from '../../../components/Input'
import Button from '../../../components/Button/index'
import Select from '../../../components/Select'

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
    <div className="App">
      <Button onClick={() => { navigate(-1) }} >
        voltar
      </Button>
      <br/>
      <form id="form" onSubmit={ handleSubmit(save) }>
        <Input type="text" {...register('uuid', { required: true })} disabled />
        <br/>
        <Select id="store" {...register('storeId', { required: true })}>
          <option></option>
          {stores.map((store, key) => (
            <option key={key} value={store.uuid}>{store.name}</option>
          ))}
        </Select>
        {(Boolean(errors.storeId)) && <span>This field is required</span>}
        <br/>
        <Input type="text" placeholder='name' {...register('name', { required: true })} />
        {(Boolean(errors.name)) && <span>This field is required</span>}
        <br/>
        <Input type="number" {...register('weight', { required: true, min: 1 })} />
        {(Boolean(errors.weight)) && <span>This field is required</span>}
        <br/>
        <Input type="number" {...register('price', { required: true, min: 1 })} />
        {(Boolean(errors.price)) && <span>This field is required</span>}
        <br/>
        <Input type="number" {...register('stock', { required: true, min: 0 })} />
        {(Boolean(errors.stock)) && <span>This field is required</span>}
        <br/>
        <Button type='submit' backgroundColor={'rgba(80, 170, 100, 1)'}>criar produto</Button>
      </form>
    </div>
  )
}

export default Product
