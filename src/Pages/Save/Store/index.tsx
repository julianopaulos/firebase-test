import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'

import { saveStore, type StoreInterface } from '../../../firebase/collections/stores'

import { v4 as uuidv4 } from 'uuid'
import Input from '../../../components/Input'

const Store = (): any => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<StoreInterface>()

  const save: SubmitHandler<StoreInterface> = async (data, event): Promise<void> => {
    await saveStore(data)
      .then(() => { alert('loja salva com sucesso') })
      .catch((e: string) => { alert(`erro ao salvar loja:\n${e}`) })

    event?.target.reset()
  }

  return (
    <div className="App">
      <button onClick={() => { navigate(-1) }} >
        voltar
      </button>
      <form onSubmit={ handleSubmit(save) }>
        <Input type="text" name='uuid' id="uuid" disabled defaultValue={uuidv4()} />
        <br/>
        <input type="text" placeholder='name' {...register('name', { required: true })} />
        {(Boolean(errors.name)) && <span>This field is required</span>}
        <br/>
        <input type="text" {...register('address', { required: true })} />
        {(Boolean(errors.address)) && <span>This field is required</span>}
        <br/>
        <button type="submit">criar produto</button>
      </form>
    </div>
  )
}

export default Store
