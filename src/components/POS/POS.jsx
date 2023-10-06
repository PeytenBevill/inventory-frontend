import {useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
// import Autocomplete from '@mui/material/Autocomplete';
import { Receipt, UserCircle } from "@phosphor-icons/react";
import axios from "axios";
import "./pos.css";

const POS = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);

    axios.get(`https://inventory-backend-ifzy9nnch-peytenbevill.vercel.app/inventory/product/${inputValue}`)
      .then((response) => {
        const results = response.data;
        setSearchResults(results);
      })
      .catch((error) => {
        console.error('Error searching for inventory:', error);
      });
  };
  return (
    <>
      <div className="posPage">
        <div className="container1">
          <span>
            <Receipt size={32} className="icon" />
            <p className="label">Sales History</p>
          </span>
          <span>
            <UserCircle size={32} className="icon" />
            <p className="label">Customer Accounts</p>
          </span>
        </div>

        <div className="container2">
          <Stack spacing={2} sx={{ width: 300 }}>
            <TextField
              label="Search input"
              variant="outlined"
              fullWidth
              type="search"
              value={searchValue}
              onChange={handleInputChange}
            />
          </Stack>
        </div>

        <div className="container3"></div>
      </div>
    </>
  );
};

export default POS;
