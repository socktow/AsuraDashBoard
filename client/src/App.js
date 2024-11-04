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
import PaymentSuccess from "./Components/PaymentResults/PaymentSuccess";
import Commands from "./Pages/Commands";
import PatchNote from "./Pages/PatchNote";
import Contact from "./Pages/About/Contact";
import Partner from "./Pages/About/Partner";
import Staff from "./Pages/About/Staff";
import Privacy from "./Pages/Misc/Privacy";
import Term from "./Pages/Misc/Term";
import NewEmbedBuilder from "./Pages/Misc/NewEmbedBuilder";
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
            {/* Single Page */}
            <Route path="Commands" element={<Commands />} />
            <Route path="Patch-Note" element={<PatchNote />} />
            <Route path="About/Contact" element={<Contact />} />
            <Route path="About/Partner" element={<Partner />} />
            <Route path="About/Staff" element={<Staff />} />
            <Route path="Misc/Privacy" element={<Privacy />} />
            <Route path="Misc/Term" element={<Term/>} />
            <Route path="Misc/New-Embed-Builder" element={<NewEmbedBuilder/>} />
          </Route>
          <Route path="/admin" element={<AdminLayout />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
