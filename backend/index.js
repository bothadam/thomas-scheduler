const express = require("express");

const app = express();
app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  console.log("ajb req", req.query);
  res.send("Hello World!" + req.query);
});

app.post("/create-product-expiry-reminder", (req, res) => {
  // First read existing users.
  // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
  //    data = JSON.parse( data );
  //    data["user4"] = user["user4"];
  //    console.log( data );
  //    res.end( JSON.stringify(data));
  // });

  console.log("ajb body", JSON.stringify(req.body));

  const expiryReminderData = JSON.stringify(req.body);

  res.sendStatus(200);
});

app.listen(port, "localhost", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
