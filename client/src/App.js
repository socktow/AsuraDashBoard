// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import UserInfoPage from "./Components/UserInfoPage/UserInfoPage";
import GuildsPage from "./Components/GuildsPage/GuildsPage";
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";
import Login from "./Pages/Login";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="user" element={<UserInfoPage />} />
            <Route path="guilds" element={<GuildsPage />} />
            <Route path="Login" element={<Login />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
