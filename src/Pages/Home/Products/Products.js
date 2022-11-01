import React, { useEffect, useState } from 'react';
import ProductsCard from './ProductsCard';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, []);

  return (
    <div className="mb-32">
      <div className="text-center mb-4">
        <p className="text-2xl font-bold text-orange-600">Popular Products</p>
        <h2 className="text-5xl font-bold m-5">Browse Our Products</h2>
        <p className='mb-10'>
          The majority have suffered alteration in some form, by injected
          humour, or Randomised <br /> words which don't look even slightly believable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {
          products.map(product => <ProductsCard key={product.id} product={product}></ProductsCard>)
        }
      </div>
      <div className="text-center">
        <button className="btn btn-outline btn-warning font-semibold">More Products</button>

      </div>
    </div>
  );
};

export default Products;