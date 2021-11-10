const express = require("express");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

const allowedOrigins = ["http://localhost:3000", "http://34.105.157.177/"];
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

app.get("/", (req, res) => {
  console.log("ajb req", req.query);
  res.send("Hello World!" + req.query);
});

app.post("/create-product-expiry-reminder", (req, res) => {
  const expiryReminderData = JSON.stringify(req.body);

  res.sendStatus(200);
});

app.listen(port, "localhost", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
