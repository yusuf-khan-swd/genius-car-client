import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('https://genius-car-server-pi-pearl.vercel.app/services')
      .then(res => res.json())
      .then(data => setServices(data))
  }, []);

  return (
    <div className="mb-32">
      <div className="text-center mb-4">
        <p className="text-2xl font-bold text-orange-600">Services</p>
        <h2 className="text-5xl font-bold">Our Service Area</h2>
        <p>
          The majority have suffered alteration in some form, by injected
          humour, or Randomised <br /> words which don't look even slightly believable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {
          services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
        }
      </div>
      <div className="text-center">
        <button className="btn btn-outline btn-warning font-semibold">More Services</button>

      </div>
    </div>
  );
};

export default Services;
