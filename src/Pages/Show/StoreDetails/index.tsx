import React, { useState } from 'react'
import { getStore, type StoreInterface } from '../../../firebase/collections/stores'
import { useNavigate } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

const StoreDetails = (): any => {
  const [stores, setStores] = useState<StoreInterface[]>([])
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<StoreInterface>()

  const search: SubmitHandler<StoreInterface> = async (data, event): Promise<void> => {
    setStores(await getStore(data.uuid))

    if (stores.length === 0) {
      alert('nenhuma loja com essa identificação')
    }

    event?.target.reset()
  }

  return (
    <div className="App">
      <Button onClick={() => { navigate(-1) }} >
        voltar
      </Button>
      <form onSubmit={ handleSubmit(search) }>
        <h3>Loja:</h3>
        <Input type="text" placeholder='identificação da loja' {...register('uuid', { required: true })} />
        {(Boolean(errors.uuid)) && <span>This field is required</span>}
        <Button type="submit">Buscar</Button>
      </form>
      {stores?.map((store, key) => {
        return (
            <ul key={key}>
                <li><b>identificação</b>: {store.uuid}</li>
                <li><b>nome</b>: {store.name}</li>
                <li><b>peso</b>: {store.address}</li>
            </ul>
        )
      })}
    </div>
  )
}

export default StoreDetails
