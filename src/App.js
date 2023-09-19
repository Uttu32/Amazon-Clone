import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Cart from "./screens/Cart";
import { Provider } from "react-redux";
import store from "./store";
import OrderScreen from "./screens/OrderScreen";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import LogOut from "./component/LogOut/LogOut";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
