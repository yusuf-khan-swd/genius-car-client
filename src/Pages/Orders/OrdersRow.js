import React, { useEffect, useState } from 'react';

const OrdersRow = ({ order, handleDelete, handleStatusUpdate }) => {
  const { _id, customerName, phone, serviceName, price, service, status } = order;
  const [orderService, setOrderService] = useState({});

  useEffect(() => {
    fetch(`https://genius-car-server-pi-pearl.vercel.app/services/${service}`)
      .then(res => res.json())
      .then(data => setOrderService(data))
  }, [service]);

  return (
    <tr>
      <th>
        <label>
          <button onClick={() => handleDelete(_id)} className='btn btn-ghost'>X</button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded w-24 h-24">
              {
                orderService?.img && <img src={orderService.img} alt={orderService.title} />
              }

            </div>
          </div>
          <div>
            <div className="font-bold"> {customerName} </div>
            <div className="text-sm opacity-50"> {phone} </div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className="badge badge-ghost badge-sm"> ${price} </span>
      </td>
      <td>Purple</td>
      <th>
        <button onClick={() => { handleStatusUpdate(_id) }} className="btn btn-ghost btn-xs"> {status ? status : 'Pending'} </button>
      </th>
    </tr>

  );
};

export default OrdersRow;