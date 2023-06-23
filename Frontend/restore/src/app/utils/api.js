import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001/categories/technology/',
  });
  
  export default api;