import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import AppRoutes from "./AppRoutes";
function App() {
    return (_jsx(_Fragment, { children: _jsx(AppRoutes, {}) }));
}






const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://carauto01-production-8b0b.up.railway.app/favorites";

fetch(PROXY_URL + API_URL)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

export default App;
