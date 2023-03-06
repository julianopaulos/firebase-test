import React from 'react'
import { type StoreInterface } from '../../../firebase/collections/stores'
import { useLoaderData, useNavigate } from 'react-router-dom'

import Button from '../../../components/Button'

const StoreDetails = (): any => {
  const stores = useLoaderData() as StoreInterface[]
  const navigate = useNavigate()

  return (
    <div className="App">
      <Button onClick={() => { navigate(-1) }} >
        voltar
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
