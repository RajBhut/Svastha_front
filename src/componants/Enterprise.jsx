import React from "react";
import { ElegantCard } from "../App";
import Footer from "./Footer";
export default function Enterprise() {
  return (
    <div className="bg-[#f1d3ca]  min-h-screen flex flex-col space-y-10 justify-around  ">
      <h1 className="h-1/6 text-7xl font-serif text-center font-bold  ">
        For Your Organization
      </h1>
      <div className="flex justify-evenly ">
        <ElegantCard head="School" />
        <ElegantCard head="Company" />
      </div>
      <Footer />
    </div>
  );
}
