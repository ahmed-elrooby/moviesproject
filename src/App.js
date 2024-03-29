import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";

function App() {
  return <>
  <Header/>
  <Outlet />
<h5 className="text-center mt-5">&copy; 2024 Ahmed El Rooby. All rights reserved.</h5>
  </>
}

export default App;
