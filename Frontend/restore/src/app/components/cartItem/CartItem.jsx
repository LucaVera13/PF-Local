import Image from 'next/image';
import React from 'react';
import Boton from '../Button/Button';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '@/redux/actions';

export default function CartItem({
  background_image,
  name,
  Marca,
  precio,
  item,
}) {
  const dispatch = useDispatch();
  return (
    <>
      <hr className='h-px bg-gray-300 border-0 ' />
      <div className='grid grid-cols-2 justify-between  my-4'>
        <div className='grid gap-4 text-slate-800 content-center items-center'>
          <h2 className=''>{name}</h2>
          <p className='text-gray-500 text-sm'>{Marca}</p>
          <p className='text-slate-800 font-semibold text-lg'>${precio}</p>
          <span>
            <Boton
              onClick={() => dispatch(removeFromCart(item))}
              secondary={true}
              text={'Eliminar'}
            />
          </span>
        </div>
        <div className='relative aspect-square justify-self-end shadow-slate-200 min-h-[160px]'>
          <Image
            className='object-contain rounded-md '
            src={background_image}
            alt={name}
            fill
            sizes='160px'
          />
        </div>
      </div>
    </>
  );
}
