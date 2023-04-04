import React from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineEdit, AiOutlineLink } from 'react-icons/ai'

import { type StoreInterface } from '../../../firebase/collections/stores'

import Button from '../../../components/Button'
import Table from '../../../components/Table'
import Div from '../../../components/Div'

const StoreDetails = (): any => {
  const stores = useLoaderData() as StoreInterface[]
  const navigate = useNavigate()

  return (
    <Div flexDirection='column'>
      <Button
        onClick={() => { navigate(-1) }}
        elementWidth={'20px'}
        margin='10px auto 10px 10px'
      >
        <AiOutlineArrowLeft size={20} />
      </Button>
      <Table>
        <thead>
          <tr>
            <th>identificação</th>
            <th>nome</th>
            <th>peso</th>
            <th><AiOutlineLink /></th>
          </tr>
        </thead>
        <tbody>
          {stores?.map((store, key) => {
            return (
              <tr key={key}>
                <td>{store.uuid}</td>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td align='center'>
                  <Link to='patch'>
                    <AiOutlineEdit size={20} title='Editar' />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Div>
  )
}

export default StoreDetails
