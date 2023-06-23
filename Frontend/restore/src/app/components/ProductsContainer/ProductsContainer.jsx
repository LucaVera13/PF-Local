'use client';
import Card from '../card/card';
import style from './ProductsContainer.module.css';
import React, { useState, useEffect } from 'react';
import productsCounter from '@/app/utils/productsCounter';

function ProductsContainer({ data, ubicaciones, marcas, estado }) {
  const stateCounter = productsCounter(estado);
  const marcasCounter = productsCounter(marcas);
  const ubiCounter = productsCounter(ubicaciones);
  console.log(stateCounter);
  const [filters] = useState({
    estado: [...new Set(estado)],
    marcas: [...new Set(marcas)],
    ubicacion: [...new Set(ubicaciones)],
    oferta: ['En oferta'],
    precio: [
      'Menos de $200000',
      'Menos de $150000',
      'Menos de $100000',
      'Menos de $50000',
      'Menos de $25000',
    ],
    order: [
      'Menor precio',
      'Mayor precio',
      'Nombre ascendiente',
      'Nombre descendiente',
    ],
  });
  const [currentFilter, setCurrentFilter] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentFilteredProducts, setCurrentFilteredProducts] = useState(
    data.result
  );

  const handleFilterChange = (key, filtro) => {
    setCurrentFilter(filtro);
    setCurrentKey(key);
  };

  const handleOrderChange = (orden) => {
    setCurrentOrder(orden);
  };

  useEffect(() => {
    const filterProducts = () => {
      const filteredProducts = data.result.filter((producto) => {
        if (currentFilter === null) return true;
        if (currentKey === 'precio') {
          const precio = parseInt(
            producto[currentKey].toString().replace('.', '')
          );
          return precio < parseInt(currentFilter.split('$')[1]);
        }
        return producto[currentKey] === currentFilter;
      });

      setCurrentFilteredProducts(filteredProducts);
    };

    filterProducts();
  }, [currentFilter, currentKey, data.result]);

  useEffect(() => {
    const orderProducts = () => {
      if (currentOrder === 'Menor precio')
        setCurrentFilteredProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => a.precio - b.precio)
        );
      if (currentOrder === 'Mayor precio')
        setCurrentFilteredProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => b.precio - a.precio)
        );
      if (currentOrder === 'Nombre ascendiente')
        setCurrentFilteredProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => a.name.localeCompare(b.name))
        );
      if (currentOrder === 'Nombre descendiente')
        setCurrentFilteredProducts((prevProducts) =>
          [...prevProducts].sort((a, b) => -1 * a.name.localeCompare(b.name))
        );
    };

    orderProducts();
  }, [currentOrder]);

  return (
    <div className='flex gap-8 container mx-auto px-4 my-8'>
      <aside className='filters flex flex-col gap-4'>
        <button
          className={` text-blue-900 text-sm bg-slate-200 rounded-md py-1 font-medium  ${
            !!currentFilter ? 'visible' : 'invisible'
          }`}
          onClick={() => handleFilterChange(null, null)}
        >
          Eliminar filtros
        </button>

        <div className='flex flex-col gap-1 text-sm text-gray-500 text-left items-start'>
          <h4 className=' text-blue-900  font-bold'>Estado</h4>
          {filters.estado.map((estado) => (
            <button
              className='hover:text-gray-700'
              key={estado}
              onClick={() => handleFilterChange('state', estado)}
            >
              {estado} ({stateCounter[estado]})
            </button>
          ))}
        </div>
        <div className='flex flex-col gap-1 text-sm text-gray-500 text-left items-start'>
          <h4 className=' text-blue-900  font-bold'>Marcas</h4>
          {filters.marcas.map((marca) => (
            <button
              className='hover:text-gray-700'
              key={marca}
              onClick={() => handleFilterChange('Marca', marca)}
            >
              {marca} ({marcasCounter[marca]})
            </button>
          ))}
        </div>
        <div className='flex flex-col gap-1 text-sm text-gray-500 text-left items-start'>
          <h4 className=' text-blue-900  font-bold'>Ubicacion</h4>
          {filters.ubicacion.map((ubi) => (
            <button
              className='hover:text-gray-700'
              key={ubi}
              onClick={() => handleFilterChange('Ubicacion', ubi)}
            >
              {ubi} ({ubiCounter[ubi]})
            </button>
          ))}
        </div>
        <div className='flex flex-col gap-1 text-sm text-gray-500 text-left items-start'>
          <h4 className=' text-blue-900  font-bold'>Precio</h4>
          {filters.precio.map((precio) => (
            <button
              className='hover:text-gray-700'
              key={precio}
              onClick={() => handleFilterChange('precio', precio)}
            >
              {precio}
            </button>
          ))}
        </div>
        <div className='flex flex-col gap-1 text-sm text-gray-500 text-left items-start'>
          <h4 className=' text-blue-900  font-bold'>Ordenar por</h4>
          {filters.order.map((orde) => {
            return (
              <button
                className='hover:text-gray-700'
                key={orde}
                onClick={() => handleOrderChange(orde)}
              >
                {orde}
              </button>
            );
          })}
        </div>
      </aside>

      <div className='grid justify-items-center mx-auto gap-4 auto-cols-max grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
        {currentFilteredProducts.length ? (
          currentFilteredProducts.map((props) => {
            return (
              <Card
                name={props.name}
                precio={props.precio}
                estado={props.state}
                marca={props.Marca}
                subcategoria={props.subcategoria}
                key={props._id}
                id={props._id}
                image={props.background_image}
                discount={props.Ofertas}
                ubicacion={props.Ubicacion}
              />
            );
          })
        ) : (
          <h2>No se encontraron productos</h2>
        )}
      </div>
    </div>
  );
}

export default ProductsContainer;
