import { db } from '../../config'
const collection = db.collection('products')

interface Product {
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
  return await collection.where('uuid', '==', uuid).get()
}

export {
  saveProduct,
  getProduct
}
