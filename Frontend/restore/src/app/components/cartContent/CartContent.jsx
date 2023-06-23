'use client';
import React, { useEffect, useState } from 'react';
import Boton from '../Button/Button';
import { useSelector } from 'react-redux';
import CartItem from '../cartItem/CartItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartContent() {
  const { cart } = useSelector((store) => store);
  const router = useRouter();
  console.log(cart);
  useEffect(
    () => {
      //chequear si esta logeado el user, si lo esta poblar el carrito con sus prods
      //se puede hacer una action que reciba muchos prod en el payload y que haga ...state, cart: [...state.cart, ...action.payload]
    },
    [
      /*aca va a ir algo como isLoggedIn*/
    ]
  );

  return (
    <div className='container px-4 m-auto my-8'>
      <h1 className='text-3xl  mb-4 font-semibold text-blue-900'>Carrito</h1>
      {cart.length ? (
        cart.map((item) => <CartItem key={item._id} item={item} {...item} />)
      ) : (
        <div className='relative min-h-[50vh] grid place-content-center'>
          <div className=' top-1/2 left-1/2 grid gap-4 justify-items-center'>
            <h2
              className=' text-3xl font-medium text-center'
              style={{
                textWrap: 'balance',
              }}
            >
              No hay nada para ver aqui
            </h2>
            <span>
              <Boton
                onClick={() => router.push('/home')}
                text={'Volver a inicio'}
              />
            </span>
          </div>
        </div>
      )}
      {cart.length ? (
        <div>
          <hr className='mb-4' />
          <p className='text-lg font-medium mb-4'>
            Total: ${cart.reduce((prev, item) => item.precio + prev, 0)}
          </p>
          <Boton text={'Comprar'}></Boton>
        </div>
      ) : null}
    </div>
  );
}
