import React, { useState } from 'react'

import { v4 as uuidv4 } from 'uuid'

const Store = (): any => {
  const [name, setName] = useState<string>('')
  const [address, setAddress] = useState<string>('')

  const save = async (): Promise<void> => {
    (document.getElementById('uuid') as HTMLInputElement).value = uuidv4()
    setName('')
    setAddress('')
  }

  return (
    <div className="App">
      <input type="text" name='uuid' id="uuid" disabled defaultValue={uuidv4()} />
      <br/>
      <input type="text" name='name' placeholder='name' required onChange={e => { setName(e.target.value) }} value={name} />
      <br/>
      <input type="text" name='address' required onChange={e => { setAddress(e.target.value) }} value={address} />
      <br/>
      <button onClick={ () => { void save() } }>criar produto</button>
    </div>
  )
}

export default Store
