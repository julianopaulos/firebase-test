import React, { useState } from 'react'
import { getStore, type StoreInterface } from '../../../firebase/collections/stores'
import { useNavigate } from 'react-router-dom'

const StoretDetails = (): any => {
  const [uuid, setUuid] = useState<string>('')
  const [stores, setStores] = useState<StoreInterface[]>([])
  const navigate = useNavigate()

  async function handleSeach (): Promise<void> {
    setStores(await getStore(uuid))
  }

  return (
    <div className="App">
      <button onClick={() => { navigate(-1) }} >
        voltar
      </button>
      <h3>Loja:</h3>
      <input type='text' name='uuid' placeholder='identificação da loja' onChange={ (e) => { setUuid(e.target.value) }} />
      <button onClick={ () => { void handleSeach() } }>Buscar</button>
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

export default StoretDetails
