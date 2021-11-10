import React, { useState } from "react";
import "./Scheduler.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DatePicker from "@mui/lab/DatePicker";

function Scheduler({}) {
  const [itemName, setItemName] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const { REACT_APP_API_URL } = process.env;

  return (
    <div className="">
      <TextField
        value={itemName}
        label="Item Name"
        onChange={(e) => setItemName(e.target.value)}
      />
      <DatePicker
        label="Expiry Date"
        value={expiryDate}
        onChange={(newValue) => {
          setExpiryDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button
        onClick={() => {
          var xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            `${REACT_APP_API_URL}/create-product-expiry-reminder`,
            true
          );
          xhr.setRequestHeader("Content-Type", "application/json");

          xhr.send(
            JSON.stringify({
              "item-name": itemName,
            })
          );
        }}
        id="hey"
        variant="contained"
      >
        hey
      </Button>
    </div>
  );
}

export default Scheduler;
