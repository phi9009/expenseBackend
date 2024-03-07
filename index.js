const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on PORT ${port}`);
  });