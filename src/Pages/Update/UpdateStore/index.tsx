import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { saveStore, type StoreInterface } from '../../../firebase/collections/stores'

import Button from '../../../components/Button'
import Div from '../../../components/Div/index'
import Input from '../../../components/Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import Form from '../../../components/Form'

const UpdateStore = (): any => {
  const stores = useLoaderData() as StoreInterface[]
  const store = stores[0]
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<StoreInterface>({
    defaultValues: {
      name: store.name,
      address: store.address
    }
  })

  const update: SubmitHandler<StoreInterface> = async (data): Promise<void> => {
    data.uuid = store.uuid

    await saveStore(data)
      .then(() => { alert('loja editar com sucesso') })
      .catch((e: string) => { alert(`erro ao editar loja:\n${e}`) })
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
      <Form onSubmit={ handleSubmit(update) }>
        <Input margin='0' type="text" placeholder='nome da loja' {...register('name', { required: true })} />
        {(Boolean(errors.name)) && <span>This field is required</span>}
        <br/>
        <Input margin='0' type="text" placeholder='endereço da loja' {...register('address', { required: true })} />
        {(Boolean(errors.address)) && <span>This field is required</span>}
        <br/>
        <Button type='submit' backgroundColor={'rgba(80, 170, 100, 1)'}>criar produto</Button>
      </Form>
    </Div>
  )
}

export default UpdateStore
