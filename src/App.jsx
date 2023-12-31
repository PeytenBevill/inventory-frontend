import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Inventory from "./components/Inventory/Inventory";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import POSAuth from "./components/POSAuth/POSAuth";
import SaleHistory from "./components/Sale-History/SaleHistory";
import Holds from "./components/Holds/Holds";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<POSAuth />} />
        <Route path="/sale-history" element={<SaleHistory />} />
        <Route path="/holds" element={<Holds />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </>
  );
}

export default App;
