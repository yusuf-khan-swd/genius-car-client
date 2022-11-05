import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import OrdersRow from "./OrdersRow";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`https://genius-car-server-pi-pearl.vercel.app/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('genius-token')}`
      }
    })
      .then((res) => {
        if (res.status > 400) {
          return logOut()
            .then(() => { })
            .catch(err => console.error(err))
        }
        return res.json()
      })
      .then((data) => {
        setOrders(data)
      });
  }, [user?.email, logOut]);

  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to cancel this order"
    );

    if (proceed) {
      fetch(`https://genius-car-server-pi-pearl.vercel.app/orders/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem('genius-token')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert('Deleted Successfully.');
            const remaining = orders.filter(odr => odr._id !== id);
            setOrders(remaining);
          }
        });
    }
  };

  const handleStatusUpdate = id => {
    fetch(`https://genius-car-server-pi-pearl.vercel.app/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('genius-token')}`
      },
      body: JSON.stringify({ status: 'Approve' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          const remaining = orders.filter(odr => odr._id !== id);
          const approving = orders.find(odr => odr._id === id);
          approving.status = 'Approve';
          const newOrders = [...remaining, approving];
          setOrders(newOrders);
        }
      })

  };

  return (
    <div>
      <h2 className="text-5xl">You Have {orders.length} Orders</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrdersRow
                key={order._id}
                order={order}
                handleDelete={handleDelete}
                handleStatusUpdate={handleStatusUpdate}
              ></OrdersRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
