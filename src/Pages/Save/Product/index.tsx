import React, { useEffect, useState } from 'react'
import { saveProduct } from '../../../firebase/collections/products'

import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { type StoreInterface, indexStores } from '../../../firebase/collections/stores'

const Product = (): any => {
  const [stores, setStores] = useState<StoreInterface[]>([])
  const [storeId, setStoreId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [weight, setWeight] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchStores = async (): Promise<any> => {
      setStores(await indexStores())
    }

    void fetchStores()
  }, [])

  const save = async (): Promise<void> => {
    const uuid = (document.getElementById('uuid') as HTMLInputElement).value
    const data = {
      storeId,
      uuid,
      name,
      weight,
      price,
      stock
    };

    (document.getElementById('uuid') as HTMLInputElement).value = uuidv4();
    (document.getElementById('store') as HTMLInputElement).value = ''
    setStoreId('')
    setName('')
    setWeight(0)
    setPrice(0)
    setStock(0)

    await saveProduct(data)
      .then(() => { alert('produto salvo com sucesso') })
      .catch((e: string) => { alert(`erro ao salvar produto:\n${e}`) })
  }

  return (
    <div className="App">
      <button onClick={() => { navigate(-1) }} >
        voltar
      </button>
      <br/>
      <input type="text" name='uuid' id="uuid" disabled defaultValue={uuidv4()} />
      <br/>
      <select name='store' id="store" onChange={e => { setStoreId(e.target.value) }}>
        <option></option>
        {stores.map((store, key) => (
          <option key={key} value={store.uuid}>{store.name}</option>
        ))}
      </select>
      <br/>
      <input type="text" name='name' placeholder='name' required onChange={e => { setName(e.target.value) }} value={name} />
      <br/>
      <input type="number" name='weight' required onChange={e => { setWeight(Number(e.target.value)) }} value={weight} />
      <br/>
      <input type="number" name='price' required onChange={e => { setPrice(Number(e.target.value)) }} value={price} />
      <br/>
      <input type="number" name='stock' required onChange={e => { setStock(Number(e.target.value)) }} value={stock} />
      <br/>
      <button onClick={ () => { void save() } }>criar produto</button>
    </div>
  )
}

export default Product
