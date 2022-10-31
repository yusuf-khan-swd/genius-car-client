import React from 'react';

const ServiceCard = ({ service }) => {
  const { img, title, price } = service;

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl p-6">
      <figure><img src={img} alt="Shoes" className='rounded-lg' /></figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className='text-orange-600 text-2xl font-semibold'>Price: ${price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;