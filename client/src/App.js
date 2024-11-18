// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./Redux/store";
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";
import Login from "./Pages/Login";
import Shop from "./Pages/Shop";
import Payment from "./Components/Payment/Payment";
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
import Placeholder from "./Pages/Misc/Placeholder";
import GuildsInfo from "./Components/GuildsPage/GuildsInfo";
import Trochoiduquay from "./Components/Trochoiduquay/Trochoiduquay";
import User from "./Components/UserInfoPage/User";
import Notfround from "./Pages/Notfround";
import { fetchUserInfo , fetchUserInfoById } from "./Redux/UserSlice";
import Testpage from "./Pages/Testpage";
function App() {
  const dispatch = useDispatch();
  const [prods, setProds] = useState({ userInfo: null, userById: null });

  useEffect(() => {
    dispatch(fetchUserInfo())
      .then((action) => {
        const userId = action?.payload?.id;
        if (userId) {
          dispatch(fetchUserInfoById(userId)).then((userByIdAction) => {
            setProds((prevProds) => ({
              ...prevProds,
              userInfo: action.payload,
              userById: userByIdAction.payload,
            }));
          });
        } else {
          console.error("User ID not found in the response");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user info:", error);
      });
  }, [dispatch]);
  
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Shop />} />
            <Route path="user" element={<User prods={prods}/>} />
            <Route path="guilds" element={<Guilds />} />
            <Route path="guilds/:guildId" element={<GuildsInfo />} />
            <Route path="Login" element={<Login />} />
            <Route path="Payment" element={<Payment />} />
            <Route path="PaymentSuccess" element={<PaymentSuccess prods={prods}/>} />
            <Route path="Duquay" element={<Trochoiduquay />} />
            <Route path="Testpage" element={<Testpage />} />
            {/* Single Page */}
            <Route path="Commands" element={<Commands />} />
            <Route path="Patch-Note" element={<PatchNote />} />
            <Route path="About/Contact" element={<Contact />} />
            <Route path="About/Partner" element={<Partner />} />
            <Route path="About/Staff" element={<Staff />} />
            <Route path="Misc/Privacy" element={<Privacy />} />
            <Route path="Misc/Term" element={<Term/>} />
            <Route path="Misc/New-Embed-Builder" element={<NewEmbedBuilder/>} />
            <Route path="Misc/Placeholder" element={<Placeholder />} />
            <Route path="*" element={<Notfround />} />

          </Route>
          <Route path="/admin" element={<AdminLayout />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
