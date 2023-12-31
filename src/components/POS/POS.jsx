import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { InputLabel, FilledInput, InputAdornment } from "@mui/material";
import Stack from "@mui/material/Stack";
// import Autocomplete from '@mui/material/Autocomplete';
import { Receipt, UserCircle, Money } from "@phosphor-icons/react";
import axios from "axios";
import "./pos.css";

const POS = ({ computerID }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const quantityInputRef = useRef(null);
  const [tax, setTax] = useState(0);

  const [total, setTotal] = useState(0);
  const [showPay, setShowPay] = useState(false);
  const [showHold, setShowHold] = useState(false);
  const [amountPaid, setAmountPaid] = useState(0);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_num, setPhone_num] = useState("");

  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.quantity * item.unit_cost,
      0
    );

    const taxTotal = newTotal + newTotal * 0.0825;

    const theTax = (newTotal * 0.0825).toFixed(2);

    const roundedTotal = (Math.round(taxTotal * 100) / 100).toFixed(2);

    setTax(theTax);
    setTotal(roundedTotal);
  }, [cart]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);

    axios
      .get(
        `https://second-inventory-backend.onrender.com/inventory/product/${inputValue}`
      )
      .then((response) => {
        const results = response.data;
        console.log(results);
        setSearchResults(results);
      })
      .catch((error) => {
        console.error("Error searching for inventory:", error);
      });
  };

  const handleCart = (result, quantity) => {
    if (quantity <= result.total_stock) {
      const newItem = {
        id: result.id,
        product: result.product,
        company: result.company,
        total_stock: result.total_stock,
        unit_cost: result.unit_cost,
        quantity: quantity,
      };

      setCart([...cart, newItem]);

      quantityInputRef.current.value = "";
      setQuantity(1);
    }
  };

  const handleClear = () => {
    setCart([]);
  };

  const handlePayScreen = () => {
    if (total > 0.01) {
      setShowPay(true);
    } else {
      setShowPay(false);
    }
  };

  const handleHoldScreen = () => {
    if (total > 0.01) {
      setShowHold(true);
    } else {
      setShowHold(false);
    }
  };

  const handleCancelPay = () => {
    setShowPay(false);
  };

  const handleSendPay = () => {
    const newCartArray = cart.map((item) => {
      return {
        product: item.product,
        unit_cost: item.unit_cost,
        quantity: item.quantity,
      };
    });

    const computerNumID = parseInt(computerID);

    const formattedDate = new Date().toISOString();

    const updateInventory = (item) => {
      const { id, quantity } = item;

      axios
        .put(
          `https://second-inventory-backend.onrender.com/inventory/stock/${id}`,
          {
            total_stock: item.total_stock - quantity,
          }
        )
        .then((response) => {
          console.log(
            `Inventory update for product ${id} successful.`,
            response.data
          );
        })
        .catch((error) => {
          console.error(`Error updating inventory for product ${id}:`, error);
        });
    };

    cart.forEach(updateInventory);

    axios
      .post(`https://second-inventory-backend.onrender.com/saleHistory`, {
        items: newCartArray,
        total: total,
        computer_num: computerNumID,
        date: formattedDate,
      })
      .then((response) => {
        console.log("Payment confirmation response:", response.data);
        setCart([]);
        setTotal(0);
        setShowPay(false);
        setSearchResults([]);
        setSearchValue("");
      })
      .catch((error) => {
        console.error("Error sending payment:", error);
      });
  };

  const formatPhoneNum = (e) => {
    const input = e.target.value;
    const cleaned = input.replace(/\D/g, "");

    if (cleaned && cleaned.length === 10) {
      const formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(
        3,
        6
      )}-${cleaned.slice(6)}`;
      setPhone_num(formatted);
    } else {
      setPhone_num(cleaned);
    }
  };

  const handleCustomerAccount = () => {
    let newCartArray = [];

    newCartArray = cart.map((item) => {
      return {
        product: item.product,
        unit_cost: item.unit_cost,
        quantity: item.quantity,
      };
    });

    const computerNumID = parseInt(computerID);

    const formattedDate = new Date().toISOString();

    const updateInventory = (item) => {
      const { id, quantity } = item;

      axios
        .put(
          `https://second-inventory-backend.onrender.com/inventory/stock/${id}`,
          {
            total_stock: item.total_stock - quantity,
          }
        )
        .then((response) => {
          console.log(
            `Inventory update for product ${id} successful.`,
            response.data
          );
        })
        .catch((error) => {
          console.error(`Error updating inventory for product ${id}:`, error);
        });
    };

    cart.forEach(updateInventory);

    axios
      .post(`https://second-inventory-backend.onrender.com/holds`, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_num: phone_num,
        receipt_data: newCartArray,
        total: total,
        remaining_balance: total - amountPaid, // Use the correct remainingBalance
        computer_num: computerNumID,
        date: formattedDate,
      })
      .then((response) => {
        setFirst_name("");
        setLast_name("");
        setEmail("");
        setPhone_num("");
        setCart([]);
        setTotal(0);
        setAmountPaid(0);
        setShowHold(false);
        setSearchResults([]);
        setSearchValue("");
      })
      .catch((error) => {
        console.error("Error sending payment:", error);
      });
  };

  return (
    <>
      <div className="posPage">
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
          <Link to="/holds" style={{ color: "white", textDecoration: "none" }}>
            <span className="two">
              <UserCircle size={32} className="icon" />
              <p className="label">Customer Accounts</p>
            </span>
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }}>
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
              label="Search item"
              variant="outlined"
              fullWidth
              type="search"
              value={searchValue}
              onChange={handleInputChange}
            />
          </Stack>
          <div className="productResults">
            {searchResults.map((result) => (
              <span key={result.id}>
                <p className="product">{result.product}</p>
                <p className="company">{result.company}</p>
                <p className="stock">{result.total_stock} in stock</p>
                <p className="cost">${result.unit_cost}</p>
                <input
                  type="number"
                  placeholder="Quantity"
                  min={1}
                  max={result.total_stock}
                  ref={quantityInputRef}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={() => handleCart(result, quantity)}>
                  Add
                </button>
              </span>
            ))}
          </div>
          <p>Logged in as computer {computerID}</p>
        </div>

        <div className="container3">
          <h2>Checkout</h2>
          <div className="cartItems">
            {cart.map((items) => (
              <>
                <p key={items.id} className="cart1">
                  {items.product} x{items.quantity}
                </p>
                <p key={items.id} className="cart2">
                  ${(items.quantity * items.unit_cost).toFixed(2)}
                </p>
              </>
            ))}
          </div>
          <p className="clear" onClick={handleClear}>
            Clear
          </p>
          <p className="tax">Tax:</p>
          <p className="taxNum">${tax}</p>
          <h3>Total:</h3>
          <p className="totalNum">${total}</p>
          <span className="payButtons">
            <button className="hold" onClick={handleHoldScreen}>
              Hold
            </button>
            <button className="pay" onClick={handlePayScreen}>
              Pay
            </button>
          </span>
        </div>
        {showPay && (
          <>
            <div className="overlay">
              <span className="payConfirm">
                <h4 className="payText">
                  Please confirm the total payment has been received
                </h4>
                <h4>Total:</h4>
                <h4 style={{ color: "red" }}>${total}</h4>
                <button className="pay" onClick={handleSendPay}>
                  Confirm
                </button>
                <button className="hold" onClick={handleCancelPay}>
                  Cancel
                </button>
              </span>
            </div>
          </>
        )}
        {showHold && (
          <>
            <div className="overlay">
              <span className="customer-form">
                <h4>Create a customer account</h4>
                <TextField
                  required
                  id="outlined-required"
                  label="First Name"
                  onChange={(e) => setFirst_name(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Last Name"
                  onChange={(e) => setLast_name(e.target.value)}
                />
                <TextField
                  id="outlined-required"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Phone Number"
                  placeholder="(123) 456-7890"
                  onChange={formatPhoneNum}
                />
                <InputLabel htmlFor="filled-adornment-amount">
                  Amount Paid Today
                </InputLabel>
                <FilledInput
                  type="text"
                  id="filled-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                />
                <button onClick={handleCustomerAccount}>Submit</button>
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default POS;
