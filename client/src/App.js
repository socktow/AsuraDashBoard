import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserInfoPage from "./Components/UserInfoPage/UserInfoPage";
import GuildsPage from "./Components/GuildsPage/GuildsPage";
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Các route con nằm trong MainLayout */}
          <Route path="user" element={<UserInfoPage />} />
          <Route path="guilds" element={<GuildsPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
