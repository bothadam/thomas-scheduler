const express = require("express");
const cors = require("cors");
const schedule = require("node-schedule");
var nodemailer = require("nodemailer");
const sqlite3 = require("sqlite3");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

const db = new sqlite3.Database("../db/thomas-scheduler.db");

const allowedOrigins = ["http://localhost:2000", "http://34.105.157.177"];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.get("/scheduled-expiry-items", (req, res) => {
  const scheduledExpiryItems = [];
  db.all("SELECT * FROM expiry_reminders", (error, rows) => {
    if (error) throw error;
    for (const row of rows) {
      scheduledExpiryItems.push(row);
    }

    res.send(scheduledExpiryItems);
  });
});

app.post("/create-product-expiry-reminder", (req, res) => {
  const { itemName, expiryDate } = req.body;

  logScheduledItemInDb({ itemName, expiryDate });

  const scheduledDate = new Date(expiryDate);

  schedule.scheduleJob(
    scheduledDate,
    function (x) {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "visionzclan007@gmail.com",
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      var mailOptions = {
        from: "visionzclan007@gmail.com",
        to: "adambotha007@gmail.com,veltie007@gmail.com",
        subject: "This product will expire",
        text: `This product will expire: ${x}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }.bind(null, itemName)
  );

  res.sendStatus(200);
});

const logScheduledItemInDb = ({ itemName, expiryDate }) => {
  const insert = db.prepare(
    "INSERT INTO expiry_reminders(item_name, expiry_date) VALUES(?,?)"
  );
  insert.run(itemName, expiryDate);
  insert.finalize();
};

app.listen(port, "localhost", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
