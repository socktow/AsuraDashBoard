import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserInfoPage from "./Components/UserInfoPage/UserInfoPage";
import GuildsPage from "./Components/GuildsPage/GuildsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<UserInfoPage />} />
        <Route path="/guilds" element={<GuildsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
