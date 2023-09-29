//import axios
import axios from "axios";

const Api = axios.create({
  //set default endpoint API
  baseURL: "https://pokeapi.co/api/v2/pokemon/ditto",
});

export default Api;
