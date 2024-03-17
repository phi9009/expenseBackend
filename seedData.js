
/** Just a simple seed file to reseed the DB */

const mongoose = require("mongoose");

const Item = require("./models/item");

const dayjs = require('dayjs');

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

const title_set = ['food', 'electricity', 'rent', 'games', 'paycheck', 'lotto', 'inheritance']
const desc_set = [ 'lorem', 'ipsum', 'blah', 'bwah', 'hahaha', 'why are you reading this', '[funny joke here]']



const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

const randomNumber = (max) => {
    return Math.floor(Math.random() * max);
}

const seedDB = async() => {
    await Item.deleteMany({});
    
    for(let i = 0; i < 200; i++){
    let coinFlip = randomNumber(10);    

        const item = new Item({
            value: Math.floor(Math.random() * 1000)+1,
            title: `${sample(title_set)}`,
            description: `${sample(desc_set)}`,
            category: `${sample(title_set)}`,
            date: dayjs()
                     .set("month", randomNumber(12))
                     .set("day", randomNumber(28))
                     .set("year", 2024),
            isExpense: (coinFlip >= 5) ? true:false,
            
        })
        await item.save();
    }
    
}
seedDB().then(() => {
    mongoose.connection.close();
})