import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import POSAuth from "./components/POSAuth/POSAuth";
import SaleHistory from "./components/Sale-History/SaleHistory";

function App() {
  // const [computers, setComputers] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://second-inventory-backend.onrender.com/computers")
  //     .then((response) => {
  //       const results = response.data;

  //       const computersArray = results.map((item) => ({
  //         computer_num: item.computer_num,
  //         comp_status: item.comp_status,
  //       }));

  //       setComputers(computersArray);
  //     });
  // });

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<POSAuth />} />
        <Route path="/sale-history" element={<SaleHistory />} />
      </Routes>
    </>
  );
}

export default App;
