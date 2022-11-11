import React, { useEffect, useState } from "react";
import { useRef } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [isAsc, setIsAsc] = useState(true);
  const [search, setSearch] = useState();
  const searchRef = useRef();

  const handleSearch = () => {
    setSearch(searchRef.current.value);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/services?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
      .then(res => res.json())
      .then(data => setServices(data))
  }, [isAsc, search]);

  return (
    <div className="mb-32">
      <div className="text-center mb-4">
        <p className="text-2xl font-bold text-orange-600">Services</p>
        <h2 className="text-5xl font-bold">Our Service Area</h2>
        <p>
          The majority have suffered alteration in some form, by injected
          humour, or Randomised <br /> words which don't look even slightly believable.
        </p>
        <div className="mb-3">
          <button onClick={() => setIsAsc(!isAsc)} className="btn btn-ghost outline outline-1 outline-gray-300 mt-8"> {isAsc ? 'Show Services as Descending Order' : 'Show Services as Ascending Order'} </button>
        </div>
        <div>
          <input ref={searchRef} type="text" className="input input-bordered input-md mr-2" />
          <button onClick={handleSearch} className="btn btn-secondary">Search</button>
        </div>

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
