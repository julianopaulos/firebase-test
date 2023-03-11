import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { type StoreInterface, saveStore } from '../../../firebase/collections/stores'

import { v4 as uuidv4 } from 'uuid'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import Div from '../../../components/Div'
import Form from '../../../components/Form'

const Store = (): any => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<StoreInterface>({
    defaultValues: {
      uuid: uuidv4()
    }
  })

  const save: SubmitHandler<StoreInterface> = async (data, event): Promise<void> => {
    await saveStore(data)
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
      <Form onSubmit={ handleSubmit(save) }>
        <Input margin='0' type="text" disabled {...register('uuid', { required: true })}/>
        <br/>
        <Input margin='0' type="text" placeholder='name' {...register('name', { required: true })} />
        {(Boolean(errors.name)) && <span>This field is required</span>}
        <br/>
        <Input margin='0' type="text" {...register('address', { required: true })} />
        {(Boolean(errors.address)) && <span>This field is required</span>}
        <br/>
        <Button type='submit' backgroundColor={'rgba(80, 170, 100, 1)'}>criar produto</Button>
      </Form>
    </Div>
  )
}

export default Store
