//import axios
import axios from "axios";

const Api = axios.create({
  //set default endpoint API
  baseURL: "https://cron.eternityinvitation.com/users",
});

export default Api;
