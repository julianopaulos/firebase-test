import { db } from '../../config'
const collection = db.collection('products')

interface Product {
  storeId: string
  uuid: string
  name: string
  weight: number
  price: number
  stock: number
};

const saveProduct = async (data: Product): Promise<any> => {
  const doc = collection.doc(data.uuid)
  await doc.set(data)
}

const getProduct = async (uuid: string): Promise<any> => {
  const productDocs = await collection
    .where('uuid', '==', uuid)
    .limit(1)
    .get()
    .then(resp => resp.docs)
    .catch(() => { throw Error('erro ao buscar produto') })

  return productDocs.map(product => product.data() as Product)
}

const indexProducts = async (): Promise<any> => {
  const productsDocs = await collection.get()
    .then(resp => resp.docs)
    .catch(() => { throw Error('erro ao buscar produtos') })

  return productsDocs.map(product => product.data() as Product)
}

const deleteProduct = async (uuid: string): Promise<void> => {
  await collection.doc(uuid).delete()
}

export {
  saveProduct,
  getProduct,
  indexProducts,
  deleteProduct,
  type Product as ProductInterface
}
