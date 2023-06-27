'use client';
import Image from 'next/image';
import Boton from '@/app/components/Button/Button';
import BackButton from '@/app/components/backButton/BackButton';
import NotFound from './notFound';
import { addToCart } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '@/app/components/loader/Loader';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import HomeContainer from '@/app/components/HomeContainer/HomeContainer';

export function DetailId({ param }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const { data: session, status } = useSession();
  const [post, setPost] = useState({ result: [] });
  const [ofertas, setOfertas] = useState({ result: [] });
  const [onCart, setOnCart] = useState(false);
  const [cookieValue, setCookieValue] = useState(null);
  useEffect(() => {
    setCookieValue(
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('User_id'))
        ?.split('=')[1]
    );
  }, []);

  const [addedToCart, setAddedToCart] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  }, [addedToCart]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://re-store.onrender.com/categories/technology/Detail/${param}`
      );
      setPost(response.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://re-store.onrender.com/categories/technology/Ofertas`
      );
      setOfertas(response.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (!addedToCart) {
      if (cart.some((cartItem) => cartItem.productId === param))
        setOnCart(true);
    }
  }, [addedToCart]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    return dispatch(
      addToCart(
        post.result[0]._id,
        session?.user.id,
        cookieValue,
        post.result[0].precio,
        post.result[0]?.Ofertas
      )
    );
  };

  if (post.message) return <NotFound />;

  const calculateDiscountedPrice = () => {
    if (post?.result[0]?.Ofertas && post.result[0].precio) {
      const descuento = parseFloat(post.result[0].Ofertas) / 100;
      const precio = parseFloat(post.result[0].precio);
      const precioConDescuento = precio - precio * descuento;
      return precioConDescuento.toFixed(2);
    }
    return null;
  };
  const precioConDescuento = calculateDiscountedPrice();

  return (
    <div className='container mx-auto px-4 my-8'>
      {!post.result[0] ? (
        <Loader />
      ) : (
        <div>
          <BackButton />
          <div className='grid md:grid-cols-2 gap-4 mb-12 mt-4'>
            <div className='relative rounded-lg aspect-square shadow-md shadow-slate-200 md:justify-self-center '>
              <Image
                className='aspect-square rounded-lg object-contain'
                src={post.result[0].background_image}
                alt={post.result[0].name}
                fill
              />
            </div>
            <div className='grid gap-4 text-gray-600'>
              <h2 className='text-xl font-semibold text-blue-900'>
                {post.result[0].name} {post.result[0].Marca}
              </h2>

              <p className=''>Ubicacion : {post.result[0].Ubicacion}</p>
              <p className=''>Estado: {post.result[0].state}</p>

              <h3 className=''>
                Calificación del vendedor : <img src='' alt='' />5
              </h3>
              {precioConDescuento ? (
                <p className='text-blue-900 text-xl font-semibold'>
                  Precio:{' '}
                  <span className='text-red-500 line-through'>
                    ${post.result[0].precio}
                  </span>{' '}
                  <span className=''>${precioConDescuento}</span>
                </p>
              ) : (
                <p className='text-blue-900 text-xl font-semibold'>
                  Precio: ${post.result[0].precio}
                </p>
              )}

              <div>
                <label className='block mb-2'>Método de envio :</label>
                <select
                  className='cursor-pointer py-1 px-2 rounded-lg bg-slate-300    text-slate-800 font-medium'
                  name='metodo'
                  id='envio'
                >
                  <option value='1'>Opción 1</option>
                  <option value='2'>Opción 2</option>
                </select>
              </div>
              <div className='flex gap-4 align-middle'>
                <span className='justify-self-start'>
                  <Boton
                    onClick={() => handleAddToCart()}
                    text={'Añadir al carrito'}
                  >
                    Añadir al carrito
                  </Boton>
                </span>
                {addedToCart ? (
                  !onCart ? (
                    <p className='self-center font-medium text-green-500'>
                      Agregado exitósamente
                    </p>
                  ) : (
                    <p className='self-center font-medium text-red-500'>
                      Ya agregaste este producto al carrito
                    </p>
                  )
                ) : null}
              </div>
            </div>
          </div>
          <div className='grid  gap-4 mb-8'>
            <div className='grid gap-2'>
              <h3 className='text-blue-900 text-xl font-medium'>
                Descripción:{' '}
              </h3>
              <p className='text-gray-600 leading-normal text-sm'>
                {post.result[0].Description}
              </p>
            </div>
            <div className='grid gap-2'>
              <h3 className='text-xl font-semibold text-blue-900'>
                También te puede interesar:
              </h3>
              <HomeContainer data={ofertas}></HomeContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
