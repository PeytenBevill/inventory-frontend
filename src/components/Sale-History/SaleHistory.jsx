import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Receipt, UserCircle } from "@phosphor-icons/react";
import axios from "axios";
import "./salehistory.css";

const SaleHistory = () => {
  const [saleSearch, setSaleSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  console.log(searchResults)

  useEffect(() => {
    axios
      .get(`https://second-inventory-backend.onrender.com/saleHistory`)
      .then((response) => {
        const data = response.data;
        // data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSearchResults(data);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="posPage2">
      <div className="container1">
        <Link
          to="/sale-history"
          style={{ color: "white", textDecoration: "none" }}
        >
          <span className="one">
            <Receipt size={32} className="icon" />
            <p className="label">Sales History</p>
          </span>
        </Link>
        <span className="two">
          <UserCircle size={32} className="icon" />
          <p className="label">Customer Accounts</p>
        </span>
      </div>
      <div className="container2">
        <Stack
          spacing={2}
          sx={{ width: 700, margin: "3% 6%" }}
          className="stack"
        >
          <TextField
            label="Search sale"
            variant="outlined"
            fullWidth
            type="search"
            // value={searchValue}
            // onChange={handleInputChange}
          />
        </Stack>
        <div className="searchResults">
        {searchResults !== null ? (
          searchResults.map((result) => (
            <span key={result.id}>
              <p>Total: ${result.total}</p>
              <p> Sold on computer {result.computer_num}</p>
              <p> Sold on: {formatDate(result.date)}</p>
            </span>
          ))
        ) : (
          <p>Loading...</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default SaleHistory;
