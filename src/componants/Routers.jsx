import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Connect from "./Connect";
import ChatbotUI from "./ChatbotUI ";
import ChatMain from "./ChatMain";
import Resorse from "./Resorse";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<Connect />} />
        <Route path="/chat" element={<ChatMain />} />
        <Route path="/res" element={<Resorse />} />
      </Routes>
    </BrowserRouter>
  );
}
