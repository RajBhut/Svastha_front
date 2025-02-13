import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../App";
import Connect from "./Connect";

import ChatMain from "./ChatMain";
import Resorse from "./Resorse";
import Therapy from "./Therapy";
import QuestionnaireForm from "./QuestionnaireForm";
import Enterprise from "./Enterprise";
import NGOList from "./NGOList";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<Connect />} />
        <Route path="/chat" element={<ChatMain />} />
        <Route path="/res" element={<Resorse />} />
        <Route path="/the" element={<Therapy />} />
        <Route
          path="/questionnaire/:therapyType"
          element={<QuestionnaireForm />}
        />
        <Route path="/ent" element={<Enterprise />} />
        <Route path="/ngo" element={<NGOList />} />
      </Routes>
    </BrowserRouter>
  );
}
