import React, { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineLink, AiOutlineSearch } from 'react-icons/ai'

import { getStore, indexStores, type StoreInterface } from '../../../firebase/collections/stores'

import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Div from '../../../components/Div'
import Table from '../../../components/Table'

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
        <Div>
          <h3>Loja: </h3>
          <Input
           type='text'
           placeholder='identificação da loja'
           margin='10px 0'
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
      <br />
      <h3>Lojas:</h3>
      <Table>
        <thead>
          <tr>
            <th>identificação da loja</th>
            <th>nome da loja</th>
            <th>endereço da loja</th>
            <th><AiOutlineLink /></th>
          </tr>
        </thead>
        <tbody>
          {stores?.map((store, key) => {
            return (
              <tr key={key}>
                <td>identificação: {store.uuid}</td>
                <td>nome: {store.name}</td>
                <td>peso: {store.address}</td>
                <td><Link to={store.uuid}>Detalhes</Link></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Store
