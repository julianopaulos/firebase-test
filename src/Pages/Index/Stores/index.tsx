import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineSearch } from 'react-icons/ai'

import { getStore, indexStores, type StoreInterface } from '../../../firebase/collections/stores'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Div from '../../../components/Div'

const Store = (): any => {
  const [stores, setStores] = useState<StoreInterface[]>(useLoaderData() as StoreInterface[])
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<StoreInterface>()

  const search: SubmitHandler<StoreInterface> = async (data, event): Promise<void> => {
    if (data.uuid.length === 0) {
      setStores(await indexStores())
      reset()

      return
    }

    setStores(await getStore(data.uuid))

    if (stores.length === 0) {
      alert('nenhuma loja com essa identificação')
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
        <h3>Loja:</h3>
        <Div>
          <Input
           type='text'
           placeholder='identificação da loja'
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
      <h3>Lojas:</h3>
      {stores?.map((store, key) => {
        return (
            <ul key={key}>
                <li><b>identificação</b>: {store.uuid}</li>
                <li><b>nome</b>: {store.name}</li>
                <li><b>peso</b>: {store.address}</li>
                <li><Link to={store.uuid}>Detalhes</Link></li>
                <br/>
            </ul>
        )
      })}
    </div>
  )
}

export default Store
