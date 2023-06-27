import React from 'react';
import { fetchOfers } from './fetch';
import { Navbar } from '../components/navbar/navbar';
import Carousel from '../components/carousel/Carousel';
import { Suspense } from 'react';
import HomeContainer from '../components/HomeContainer/HomeContainer';
import Link from 'next/link';

async function Home() {
  const data = await fetchOfers();
  // const data = window !== undefined ? await fetchOfers() : {};
  // const ubicaciones = data.result.map(producto => producto.Ubicacion)
  // const marcas = data.result.map(producto => producto.Marca)
  // const estado = data.result.map(producto => producto.state)

  return (
    <>
      <Navbar />
      <Carousel />
      <div className='mx-auto container px-4 mb-8'>
        <div className='flex align-middle justify-center gap-16 py-8 flex-wrap gap-y-4'>
          <Link
            title='click to visit ConsolasyVideojuegos'
            href={'/home/ConsolasyVideojuegos'}
          >
            Consolas
          </Link>
          <Link title='click to visit TV' href={'/home/TV'}>
            TV
          </Link>
          <Link title='click to visit Celulares' href={'/home/Celulares'}>
            Celulares
          </Link>
          <Link
            title='click to visit ElectronicaAudioVideo'
            href={'/home/ElectronicaAudioVideo'}
          >
            Audio y video
          </Link>
          <Link title='click to visit Computacion' href={'/home/Computacion'}>
            Computacion
          </Link>{' '}
          <Link
            title='click to visit CamarasyAccesorios'
            href={'/home/CamarasyAccesorios'}
          >
            Camaras
          </Link>
        </div>
        <h2 className='text-4xl text-center mb-4 font-medium text-blue-900'>
          {' '}
          Ofertas Limitadas!
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <HomeContainer data={data}></HomeContainer>
          {/* <ProductsContainer data={data} ubicaciones={ubicaciones} marcas={marcas} estado={estado}/> */}
        </Suspense>
        {/* <HomeContainer data={data}></HomeContainer> */}
      </div>
    </>
  );
}

export default Home;
