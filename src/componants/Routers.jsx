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
import NgoDetailsPage from "./NgoDetailsPage";
import Res from "./Res";
import TApp from "./TApp";
import Therapystportal from "./Therapystportal";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<Connect />} />
        <Route path="/chat" element={<ChatMain />} />

        <Route path="/the" element={<Therapy />} />
        <Route
          path="/questionnaire/:therapyType"
          element={<QuestionnaireForm />}
        />
        <Route path="/ent" element={<Enterprise />} />
        <Route path="/ngo" element={<NGOList />} />
        <Route path="/ngo/:id" element={<NgoDetailsPage />} />
        <Route path="/res" element={<Res />} />
        <Route path="/match" element={<TApp />} />
        <Route path="/patiantHistory" element={<Therapystportal />} />
      </Routes>
    </BrowserRouter>
  );
}
