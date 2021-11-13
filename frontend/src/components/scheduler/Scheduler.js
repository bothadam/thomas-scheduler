import React, { useState } from "react";
import "./Scheduler.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { CircularProgress } from "@mui/material";
import Emitter from "../../services/Emitter";

function Scheduler({}) {
  const [itemName, setItemName] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { REACT_APP_API_URL } = process.env;

  const scheduleEventButtonClicked = async () => {
    setIsLoading(true);

    await fetch(`${REACT_APP_API_URL}/create-product-expiry-reminder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemName: itemName,
        expiryDate: expiryDate,
      }),
    });

    setIsLoading(false);

    Emitter.emit("NEW_ITEM_SCHEDULED", null);

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
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={22} /> : "Create Reminder"}
      </Button>
    </div>
  );
}

export default Scheduler;
