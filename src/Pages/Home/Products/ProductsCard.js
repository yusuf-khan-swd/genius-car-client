import React from 'react';
import { FaStar } from 'react-icons/fa';

const ProductsCard = ({ product }) => {
  const { img, name, price, review } = product;

  const totalReview = parseFloat(review);
  const reviewStars = [];
  for (let i = 1; i <= totalReview; i++) {
    reviewStars.push(<FaStar className='text-orange-400 text-xl'></FaStar>)
  }

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl p-6 text-center">
      <figure><img src={img} alt="Shoes" className='rounded-lg' /></figure>
      <div className="card-body">
        <div className='flex justify-center'>
          {
            reviewStars.map((star, index) => <div key={index}> {star} </div>)
          }
        </div>
        <h2 className="card-title mx-auto">{name}</h2>
        <p className='text-orange-600 text-xl font-semibold'>Price: ${price}</p>
        <div className="card-actions justify-end">
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;