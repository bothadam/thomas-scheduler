import React from "react";
import Button from "@mui/material/Button";
import "./Scheduler.css";

function Scheduler({}) {
  const { REACT_APP_API_URL } = process.env;

  return (
    <div className="">
      <form
        action={`${REACT_APP_API_URL}/create-product-expiry-reminder`}
        method="post"
      >
        <input type="text" name="item-name" />
        <input type="date" name="expiry-date" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Scheduler;
