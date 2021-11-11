import React, { useState } from "react";
import "./Scheduler.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import DatePicker from "@mui/lab/DatePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";

function Scheduler({}) {
  const [itemName, setItemName] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const { REACT_APP_API_URL } = process.env;

  const scheduleEventButtonClicked = () => {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${REACT_APP_API_URL}/create-product-expiry-reminder`,
      false
    );

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(
      JSON.stringify({
        itemName: itemName,
        expiryDate: expiryDate,
      })
    );

    setItemName("");
    setExpiryDate(null);

    alert("Reminder has been set");
  };

  return (
    <div className="Scheduler">
      <TextField
        value={itemName}
        label="Item Name"
        onChange={(e) => setItemName(e.target.value)}
      />
      <DateTimePicker
        disablePast
        label="Expiry Date"
        value={expiryDate}
        onChange={(newValue) => {
          setExpiryDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <Button
        onClick={scheduleEventButtonClicked}
        id="add-schedule"
        variant="contained"
        style={{ height: 50 }}
      >
        Create Reminder
      </Button>
    </div>
  );
}

export default Scheduler;
