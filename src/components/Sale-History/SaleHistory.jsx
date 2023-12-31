import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Receipt, UserCircle, Money } from "@phosphor-icons/react";
import axios from "axios";
import "./salehistory.css";

const SaleHistory = () => {
  const [saleSearch, setSaleSearch] = useState("");
  const [saleResults, setSaleResults] = useState(null);
  const [showReceiptData, setShowReceiptData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://second-inventory-backend.onrender.com/saleHistory`)
      .then((response) => {
        const data = response.data;
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSaleResults(data);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const toggleReceiptData = (data) => {
    setShowReceiptData(data);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const inputNumber = Number(saleSearch);
      setSaleSearch(inputNumber);

      axios
        .get(
          `https://second-inventory-backend.onrender.com/saleHistory/cost/${inputNumber}`
        )
        .then((response) => {
          const data = response.data;
          data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setSaleResults(data);
        })
        .catch((error) => {
          console.error("Error searching for sale:", error);
        });
    }
  };

  return (
    <div className="posPage2">
      <div
        className="container1"
        style={{ gridTemplateRows: "100px 100px 100px" }}
      >
        <Link
          to="/sale-history"
          style={{ color: "white", textDecoration: "none" }}
        >
          <span className="one">
            <Receipt size={32} className="icon" />
            <p className="label">Sales History</p>
          </span>
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }}>
          <span className="two">
            <UserCircle size={32} className="icon" />
            <p className="label">Customer Accounts</p>
          </span>
        </Link>
        <Link to='/sales' style={{ color: "white", textDecoration: "none" }}>
          <span className="three">
            <Money size={32} className="icon" />
            <p className="label">Sales Terminal</p>
          </span>
        </Link>
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
            onChange={(e) => setSaleSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </Stack>
        <div className="searchResults">
          {saleResults !== null ? (
            saleResults.map((result) => (
              <span key={result.id} className="spanRow">
                <p className="total">Total: ${result.total}</p>
                <p> Sold on computer {result.computer_num}</p>
                <p className="date">{formatDate(result.date)}</p>
                <button
                  className="item-dropdown"
                  onClick={() => toggleReceiptData(result.receipt_data)}
                >
                  See Items
                </button>
                {showReceiptData === result.receipt_data && (
                  <>
                    {result.receipt_data.map((item, index) => (
                      <>
                        <p className="productHistory">{item.product}</p>
                        <p className="qty">Qty: {item.quantity}</p>
                        <p className="unit-cost">${item.unit_cost}</p>
                      </>
                    ))}
                  </>
                )}
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
