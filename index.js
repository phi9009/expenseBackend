/**  This back end is fairly simple so I'm not going to break it down into routers.
 *  
 *  before we continue. I am aware ther is no Authorization/Authentication
 *  that's not the point of this project. I just wanted to make something simple to get
 *  my legs under me and show to myself and others I an get something running even if it isn't
 *  perfect.
 *  
*/

// dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const wrapAsync = require("./wrapAsync");
const Item = require("./models/item");

// static folder serving
app.use(express.static(path.join(__dirname, "dist")));


// mongo/mongoose connection stuff.
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

// basic middleware to recieve data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connection stuff.
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// get the data from the server and give it to the web page. this could be
// just the month requested but I choose not to. this doesn't scale well.
// i know.
app.get("/month", wrapAsync( async (req, res) =>{
  res.setHeader('Content-Type', 'application/json');
  const response = await Item.find();
  res.json(response);
}))

// delete the item with the id being sent, and return the conformation
app.delete("/item/:id", wrapAsync(async (req,res) => {
    const delete_id = req.params.id;
    const deleted = await Item.deleteOne({_id: delete_id});
    res.json(deleted);
}))

// update the item being handed to us.
app.put("/item/:id", wrapAsync(async (req, res) => {
    const update_id = req.params.id;
    const update_item = req.body;
    await Item.findOneAndUpdate({_id: update_id}, update_item);
    res.json({success: true})
}))

// add a new item.
app.post("/item", wrapAsync(async (req, res) => {
  const new_item = req.body;
  
  const _new_item = await Item.create(new_item);

  res.json(_new_item);
}))

// top level/home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  });

// if we where deployed use the environment variable otherwise server
// on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on PORT ${port}`);
  });