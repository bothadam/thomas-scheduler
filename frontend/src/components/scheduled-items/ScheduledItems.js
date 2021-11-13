import moment from "moment";
import React, { useEffect, useState } from "react";
import Emitter from "../../services/Emitter";
import "./ScheduledItems.css";

function ScheduledItems({}) {
  const { REACT_APP_API_URL } = process.env;
  const [scheduledItems, setScheduledItems] = useState([]);

  useEffect(() => {
    const getScheduledItems = async () => {
      try {
        let response = await fetch(
          `${REACT_APP_API_URL}/scheduled-expiry-items`
        );
        response = await response.json();
        response = response.sort(
          (a, b) => new Date(a.expiry_date) - new Date(b.expiry_date)
        );
        setScheduledItems(response);
      } catch (e) {
        console.log("COULD NOT FETCH DATA", e);
      }
    };
    getScheduledItems();

    Emitter.subscribe("NEW_ITEM_SCHEDULED", () => getScheduledItems());

    return () => {
      Emitter.unsubscribe("NEW_ITEM_SCHEDULED");
    };
  });

  return (
    <div className="ScheduledItems">
      <div className="scheduled-item-row header">
        <div className="scheduled-item-column">Item Name</div>
        <div className="scheduled-item-column">Expiry Date</div>
        <div className="scheduled-item-column">Days Until Expiry</div>
      </div>
      {scheduledItems.map((scheduledItem) => {
        const timeUntilExpiry = moment(scheduledItem.expiry_date).diff(
          moment.now(),
          "days"
        );
        return (
          <div className="scheduled-item-row">
            <div className="scheduled-item-column">
              {scheduledItem.item_name}
            </div>
            <div className="scheduled-item-column">
              {moment(scheduledItem.expiry_date).format("yyyy/MM/DD")}
            </div>
            <div className="scheduled-item-column">
              {timeUntilExpiry > 0 ? timeUntilExpiry : "expired"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ScheduledItems;
