'use client';
import { DetailId } from './FetchDetail.jsx';
import { Navbar } from '@/app/components/navbar/navbar.jsx';
import { fetchDetail } from '../../fetch.js';
import { Provider } from 'react-redux';
import store from '../../../../redux/store.js';
import { useParams } from 'next/navigation.js';

// export async function generateMetadata({ params, searchParams }, 
//   parent) {
//   const id = params.productId;


//   const product = await fetchDetail(id);

//   return product.result
//     ? {
//         title: product.result[0].name,
//       }
//     : { title: 'No encontrado' };
// }

async function Detail() {
  const params = useParams()

  return (
    <>
      <Navbar />
      <Provider store={store}>
        <section>
          <DetailId param={params.productId} />
        </section>
      </Provider>
    </>
  );
}

export default Detail;
