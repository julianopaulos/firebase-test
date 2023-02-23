import { db } from '../../config';
const collection = db.collection('products');

interface Product {
    uuid: string;
    name: string;
    weight: number;
    price: number;
    stock: number;
};

const saveProduct = async (data: Product) => {
    const doc = collection.doc(data.uuid);
    return await doc.set(data);
}

const getProduct = async (uuid: string) => {
    return await collection.where('uuid', '==', uuid).get()
};

export {
    saveProduct,
    getProduct
};