'use client';

import { useState } from 'react';
import Link from 'next/link';
import Boton from '../Button/Button';

export default function Searchbar() {
  const [searchValue, setSearchValue] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Valor de búsqueda:', searchValue);
  };

  const handleChange = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
    newSearchValue.length > 0 ? setDisabled(false) : setDisabled(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='bg-slate-200 text-slate-800 px-2 py-2 mr-4 rounded-md outline-slate-800'
        type='text'
        placeholder='Buscar'
        value={searchValue}
        onChange={handleChange}
      />
      <Link
        href={{
          pathname: '/search',
          query: {
            search: searchValue,
          },
        }}
      >
        <Boton disabled={disabled} text={'Buscar'} type='submit'></Boton>
      </Link>
    </form>
  );
}

// 'use client';
// import axios from 'axios';
// import React, { useState } from 'react';

// export default function Searchbar(
//   {
//       //  setSearchResult,
//       //  setExistingSearch,
//       //  existingSearch,
//   }
// ) {
//   //debe recibir una function de setear la busqueda, setear si existe una busqueda, y saber si existe una busqueda
//   //para que el componente padre tenga acceso a los resultados
//   //y se pueda mapear esta data si la search existe
//   /*
//         en el componente padre:
//           const [searchResult, setSearchResult] = useState([]);
//           const [existingSearch, setExistingSearch] = useState(false);

//           <Searchbar
//             setSearchResult={setSearchResult}
//             setExistingSearch={setExistingSearch}
//             existingSearch={ existingSearch}
//             />

//           y despues condicionalmente mostrar los resultados:
//                 <ProductsContainer data={existingSearch ? searchResult : laOtraDataQueNoSeaDeBusqueda} />
//     */
//   const [inputValue, setInputValue] = useState('');
//   //estos se eliminarian de aca una vez que estan en el componente padre:
//   // const [searchResult, setSearchResult] = useState([]);
//   // const [existingSearch, setExistingSearch] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setExistingSearch(true);

//     const { value } = event.target[0];

//     // setLoading(true);
//     try {
//       const {
//         data: { result },
//       } = await axios.get(endpoint, {
//         params: { name: value },
//       });
//       console.log(result);
//       //logica para volver al principio (hay que hacerla):
//       //   dispatch(setPageToOne());
//       setSearchResult(result);
//       //   setLoading(false);
//     } catch (error) {
//       console.log('...............', error.message);
//       //   setLoading(false);
//       //tirar state de error y que muestre la 404.
//     }
//   };

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleDeleteSearch = () => {
//     setExistingSearch(false);
//     setInputValue('');
//     setSearchResult([]);
//     //setear errorres a false
//     //llevar al principio de la pagina
//   };
//   return (
//     <div>
//       {/* <div>
//         <form onSubmit={handleSubmit} action=''>
//           <input
//             placeholder='Buscar...'
//             value={inputValue}
//             onChange={handleInputChange}
//             type='text'
//           />
//         </form>
//       </div>
//       {existingSearch ? (
//         <button onClick={handleDeleteSearch}>Borrar búsqueda</button>
//       ) : null} */}
//     </div>
//   );
// }

// const endpoint = 'http://localhost:3001/categories/technology/searchName';
