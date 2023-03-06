import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { type StoreInterface } from '../../../firebase/collections/stores'

import Button from '../../../components/Button'

const StoreDetails = (): any => {
  const stores = useLoaderData() as StoreInterface[]
  const navigate = useNavigate()

  return (
    <div className="App">
      <Button
        onClick={() => { navigate(-1) }}
        Elementwidth={'20px'}
      >
        <AiOutlineArrowLeft size={20} />
      </Button>
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
