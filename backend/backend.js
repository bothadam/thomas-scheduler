const express = require("express");

const app = express();
app.use(express.json());

const port = 3001;

app.get("/", (req, res) => {
  console.log("ajb req", req.query);
  res.send("Hello World!" + req.query);
});

app.post("/create-product-expiry-reminder", (req, res) => {
  console.log("ajb body", JSON.stringify(req.body));

  const expiryReminderData = JSON.stringify(req.body);

  res.sendStatus(200);
});

app.listen(port, "localhost", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});