import React, { useEffect, useState } from 'react';
import { getProducts } from '../../../actions';
import StoreCard from '../../component/Store/StoreCard';


export default function Store() {

 const [products,setProducts] = useState([]);
 const [error,setError] = useState("");

 async function getRequest(){
   try {
    const result = await getProducts()
    if(result.success === false) throw result.error;
    setProducts(result)
   } catch (error) {
    setError("Products not exists!")
   }
 }

  useEffect(() => {
    getRequest()
  },[])

  return (
    <div className='flex justify-between items-center flex-wrap w-[90%] mx-auto mt-10'>
      {error && <p id='error_result' className='text-center text-white text-2xl font-semibold mt-5'>{error}</p>}
      {products?.map((product) => (
      <StoreCard key={product.id} {...product} />
      ))}
    </div>
  )
}
