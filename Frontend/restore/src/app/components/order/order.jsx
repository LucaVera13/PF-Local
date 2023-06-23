"use client"

import React, { useState } from "react";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [selectAz, setSelectAz] = useState("0");
  const [selectPrice, setSelectPrice] = useState("0");

  const handleOrderChange = (event) => {
    setSelectAz(event.target.value);
  };

  const handlePriceChange = (event) => {
    setSelectPrice(event.target.value);
  };

  const applyOrder = () => {
    if (selectAz === "az") {
      let asc = [...order].sort((prev, next) => {
        if (prev.name > next.name) return 1;
        if (prev.name < next.name) return -1;
        return 0;
      });
      return asc;
    } else if (selectAz === "za") {
      let desc = [...order].sort((prev, next) => {
        if (prev.name > next.name) return -1;
        if (prev.name < next.name) return 1;
        return 0;
      });
      return desc;
    }
    return order;
  };

  const applyPriceOrder = () => {
    if (selectPrice === "mayor") {
      let higher = [...order].sort((prev, next) => {
        return next.price - prev.price;
      });
      return higher;
    } else if (selectPrice === "menor") {
      let lower = [...order].sort((prev, next) => {
        return prev.price - next.price;
      });
      return lower;
    }
    return order;
  };

  const filteredOrder = applyOrder();
  const filteredPriceOrder = applyPriceOrder();

  return (
    <div>
      <div>
        <select name="orderAZ" id="AZ" value={selectAz} onChange={handleOrderChange}>
          <option value="0">Ordenar</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>
      <div>
        <select name="orderPrice" id="Price" value={selectPrice} onChange={handlePriceChange}>
          <option value="0">Precio</option>
          <option value="mayor">Mayor precio</option>
          <option value="menor">Menor precio</option>
        </select>
      </div>
      <ul>
        {filteredOrder.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <ul>
        {filteredPriceOrder.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
