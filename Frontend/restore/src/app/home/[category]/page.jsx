import { fetchCategory } from '../fetch';
import { Navbar } from '@/app/components/navbar/navbar';
import style from './page.module.css';
import ProductsContainer from '@/app/components/ProductsContainer/ProductsContainer';

export function generateMetadata({ params, searchParams }, parent) {
  const categoria = params.category;

  return {
    title: categoria,
  };
}

async function page({ params }) {
  const categoria = params.category;

  const data = await fetchCategory(categoria);
  const ubicaciones = data.result.map((producto) => producto.Ubicacion);
  const marcas = data.result.map((producto) => producto.Marca);
  const estado = data.result.map((producto) => producto.state);

  return (
    <>
      <Navbar />

      <h2 className='bg-yellow-50 text-2xl text-center font-bold py-2 relative z-10'>
        {categoria}
      </h2>
      <ProductsContainer
        data={data}
        ubicaciones={ubicaciones}
        marcas={marcas}
        estado={estado}
      />
    </>
  );
}

export default page;

export const revalidate = 30;
