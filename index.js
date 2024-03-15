const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const wrapAsync = require("./wrapAsync");
const Item = require("./models/item");

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


app.get("/month", wrapAsync( async (req, res) =>{
  res.setHeader('Content-Type', 'application/json');
  console.log("Hello?")
  
  const response = await Item.find();
  //res.send(JSON.stringify({ a: 1 }));
  res.json(response);
}))

app.delete("/item/:id", wrapAsync(async (req,res) => {
    const delete_id = req.params.id;
    const deleted = await Item.deleteOne({_id: delete_id});
    res.json(deleted);
}))

app.put("/item/:id", wrapAsync(async (req, res) => {
    const update_id = req.params.id;
    console.log(req.body)
    const update_item = req.body;
    await Item.findOneAndUpdate({_id: update_id}, update_item);
    res.json({success: true})
}))
app.post("/item/:id", wrapAsync(async (req, res) => {
  const new_item = req.body;
  
  const _new_item = await Item.create(new_item);

  res.json(_new_item);
}))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  });


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on PORT ${port}`);
  });