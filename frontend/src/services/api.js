import axios from "axios";

const api = axios.create({
  baseURL: "https://uploads-example.herokuapp.com/",
});

export default api;
