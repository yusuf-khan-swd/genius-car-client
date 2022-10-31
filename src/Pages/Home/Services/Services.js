import React, { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('services.json')
      .then(res => res.json())
      .then(data => setServices(data))
  }, []);

  return (
    <div>
      <div className="text-center">
        <p className="text-2xl font-bold text-orange-600">Services</p>
        <h2 className="text-5xl font-bold">Our Service Area</h2>
        <p>
          The majority have suffered alteration in some form, by injected
          humour, or Randomised <br /> words which don't look even slightly believable.
        </p>
      </div>
      <div>
        <h2>Total Services Available: {services.length}</h2>
      </div>
    </div>
  );
};

export default Services;
