import api from "../utils/api";

export const fetchOfers = async () => {
  const response = await api.get('/Ofertas', { params: { next: { revalidate: 30 } } });
  return response.data;
};

export const fetchCategory = async (category) => {
  const response = await api.get(`/categoria/${category}`);
  return response.data;
};

export const fetchDetail = async (productId) => {
  const response = await api.get(`/Detail/${productId}`);
  return response.data;
};

export const fetchSearch = async (search) => {
  const response = await api.get('/searchname', { params: { name: search } });
  return response.data;
};