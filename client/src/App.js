// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";
import Login from "./Pages/Login";
import Shop from "./Pages/Shop";
import Payment from "./Components/Payment/Payment";
import UserInfo from "./Components/UserInfoPage/UserInfo";
import Guilds from "./Components/GuildsPage/Guilds";
import PaymentSuccess from "./Components/testpayment/PaymentSuccess";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Shop />} />
            <Route path="user" element={<UserInfo />} />
            <Route path="guilds" element={<Guilds />} />
            <Route path="Login" element={<Login />} />
            <Route path="Payment" element={<Payment />} />
            <Route path="PaymentSuccess" element={<PaymentSuccess />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
