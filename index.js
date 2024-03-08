const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.use(express.static(path.join(__dirname, "dist")));


const dbUrl = "mongodb://127.0.0.1:27017/expenseDatabase";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MONGO CONNECTION OPEN!");
  })
  .catch((err) => {
    console.log("THERE HAS BEEN AN ERROR");
    console.log(err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


app.get("/month", (req, res) =>{
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ a: 1 }));
})



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on PORT ${port}`);
  });