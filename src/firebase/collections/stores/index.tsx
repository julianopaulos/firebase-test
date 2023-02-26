import { db } from '../../config'
const collection = db.collection('stores')

interface Store {
  uuid: string
  name: string
  address: string
};

const saveStore = async (data: Store): Promise<any> => {
  const doc = collection.doc(data.uuid)
  await doc.set(data)
}

const getStore = async (uuid: string): Promise<any> => {
  const storeDocs = await collection
    .where('uuid', '==', uuid)
    .limit(1)
    .get()
    .then(resp => resp.docs)
    .catch(() => { throw Error('erro ao buscar loja') })

  return storeDocs.map(product => product.data() as Store)
}

const indexStores = async (): Promise<any> => {
  const storesDocs = await collection.get()
    .then(resp => resp.docs)
    .catch(() => { throw Error('erro ao buscar lojas') })

  return storesDocs.map(product => product.data() as Store)
}

export {
  saveStore,
  getStore,
  indexStores,
  type Store as StoreInterface
}
