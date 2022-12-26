import axios from "axios";

 export default axios.create({
  // прописываем базовый адрес 
  baseURL: 'http://www.omdbapi.com',
 
});