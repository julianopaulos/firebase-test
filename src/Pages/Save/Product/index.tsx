import React, { useState } from 'react'
import { saveProduct } from '../../../firebase/collections/products'

import { v4 as uuidv4 } from 'uuid'

const Product = (): any => {
  const [name, setName] = useState<string>('')
  const [weight, setWeight] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)

  const save = async (): Promise<void> => {
    const uuid = (document.getElementById('uuid') as HTMLInputElement).value
    const data = {
      uuid,
      name,
      weight,
      price,
      stock
    };

    (document.getElementById('uuid') as HTMLInputElement).value = uuidv4()
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
      <input type="text" name='uuid' id="uuid" disabled defaultValue={uuidv4()} />
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
