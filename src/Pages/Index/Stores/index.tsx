import React, { useEffect, useState } from 'react'
import { indexStores, type StoreInterface } from '../../../firebase/collections/stores'
import { useNavigate } from 'react-router-dom'

const Store = (): any => {
  const [stores, setStores] = useState<StoreInterface[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStores = async (): Promise<any> => {
      setStores(await indexStores())
    }

    void fetchStores()
  }, [])

  return (
    <div className="App">
      <button onClick={() => { navigate(-1) }} >
        voltar
      </button>
      <h3>Lojas:</h3>
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

export default Store
