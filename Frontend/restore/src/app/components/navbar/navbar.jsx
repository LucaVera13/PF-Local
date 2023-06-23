import React from 'react';
import Link from 'next/link';
// import "./Navbar.css";
import Searchbar from '../searchbar/searchbar';
//mostrar fabars como clickeable y desplegar menu con lo otro en modo responsive

export const Navbar = () => {
  return (
    <nav className=' py-4  z-20 sticky top-0 bg-slate-900 text-slate-50'>
      <div className='container  px-4 mx-auto flex gap-4 justify-between'>
        <Link className='link' href={'/home'}>
          {/* <FaHome style={{ color: '#f8fafc' }} fontSize={30} /> */}
        </Link>
        <div className='flex gap-8 justify-between items-center'>
          <Link className='link' href={'/user'}>
            User
          </Link>
          <Link className='link' href={'/login'}>
            Signup/Login
          </Link>
          <Link className='link' href={'/form'}>
            Crear producto
          </Link>
          <Searchbar />
          <Link href={'/cart'}>
          </Link>
        </div>
      </div>
    </nav>
  );
};
