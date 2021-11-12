import moment from "moment";
import React, { useEffect, useState } from "react";
import "./ScheduledItems.css";

function ScheduledItems({}) {
  const { REACT_APP_API_URL } = process.env;
  const [scheduledItems, setScheduledItems] = useState([]);

  useEffect(() => {
    try {
      const getScheduledItems = async () => {
        let response = await fetch(
          `${REACT_APP_API_URL}/scheduled-expiry-items`
        );
        response = await response.json();
        response = response.sort(
          (a, b) => new Date(a.expiry_date) - new Date(b.expiry_date)
        );
        setScheduledItems(response);
      };
      getScheduledItems();
    } catch (e) {
      console.log("COULD NOT FETCH DATA", e);
    }
  }, []);

  return (
    <div className="ScheduledItems">
      <div className="scheduled-item-row header">
        <div className="scheduled-item-column">Item Name</div>
        <div className="scheduled-item-column">Expiry Date</div>
      </div>
      {scheduledItems.map((scheduledItem) => {
        return (
          <div className="scheduled-item-row">
            <div className="scheduled-item-column">
              {scheduledItem.item_name}
            </div>
            <div className="scheduled-item-column">
              {moment(scheduledItem.expiry_date).format("yyyy/MM/DD")}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ScheduledItems;
