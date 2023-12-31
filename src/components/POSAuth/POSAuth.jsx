import { useState, useEffect } from "react";
import POS from "../POS/POS";
import axios from "axios";
import "./posAuth.css";

const POSAuth = () => {
  const [computerID, setComputerID] = useState(
    localStorage.getItem("computerID") || ""
  );
  const [login, setLogin] = useState(
    localStorage.getItem("computer_num") === "true"
  );
  const [computers, setComputers] = useState([]);
  const [inputError, setInputError] = useState(false)

  const handleComputerID = (event) => {
    const inputValue = event.target.value;
    localStorage.setItem("computerID", inputValue);
    setComputerID(inputValue);
  };

  useEffect(() => {
    axios
      .get("https://second-inventory-backend.onrender.com/computers")
      .then((response) => {
        const results = response.data;

        const computersArray = results.map((item) => ({
          computer_num: item.computer_num,
          comp_status: item.comp_status,
        }));

        setComputers(computersArray);
      });
  }, []);

  const handleLogIn = () => {
    const computer_nums = computers.map((computer) => computer.computer_num);

    const id = parseInt(computerID);

    for (let i = 0; i < computer_nums.length; i++) {
      if (computer_nums[i] === id && computers[i].comp_status === 0) {
        localStorage.setItem("computer_num", "true");
        axios
          .put(
            `https://second-inventory-backend.onrender.com/computers/${id}`,
            {
              comp_status: 1,
            }
          )
          .then((res) => {
            res.data;
          });
        setInputError(false)
        setLogin(true);

      } else {
        setInputError(true)

      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogIn();
    }
  };

  return (
    <>
      {login ? (
        <POS computerID={computerID} setLogin={setLogin} />
      ) : (
        <>
          <span className="posLogin">
            <h4>Computer ID</h4>
            <input
              type="text"
              value={computerID}
              onChange={handleComputerID}
              onKeyDown={handleKeyPress}
              style={{borderColor: inputError ? "red" : "" }}
            />
            <button onClick={() => handleLogIn()}>Log in</button>
          </span>
        </>
      )}
    </>
  );
};

export default POSAuth;
