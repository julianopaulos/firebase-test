import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

import { type StoreInterface } from '../../../firebase/collections/stores'

import Button from '../../../components/Button'
import Table from '../../../components/Table'

const StoreDetails = (): any => {
  const stores = useLoaderData() as StoreInterface[]
  const navigate = useNavigate()

  return (
    <div className="App">
      <Button
        onClick={() => { navigate(-1) }}
        elementWidth={'20px'}
      >
        <AiOutlineArrowLeft size={20} />
      </Button>
      <Table>
        <thead>
          <tr>
          <th>identificação</th>
          <th>nome</th>
          <th>peso</th>
          </tr>
        </thead>
        <tbody>
          {stores?.map((store, key) => {
            return (
              <tr key={key}>
                <td>{store.uuid}</td>
                <td>{store.name}</td>
                <td>{store.address}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default StoreDetails
