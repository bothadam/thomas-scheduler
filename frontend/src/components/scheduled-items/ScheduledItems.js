import React, { useEffect, useState } from "react";
import "./ScheduledItems.css";

function ScheduledItems({}) {
  const { REACT_APP_API_URL } = process.env;
  const [scheduledItems, setScheduledItems] = useState([]);

  useEffect(() => {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      console.log("ajb ", xhr.response);
      setScheduledItems(xhr.response);
    });
    xhr.open("GET", `${REACT_APP_API_URL}/scheduled-expiry-items`, false);
    xhr.send();
  }, []);

  return <div className="ScheduledItems">{scheduledItems}</div>;
}

export default ScheduledItems;
