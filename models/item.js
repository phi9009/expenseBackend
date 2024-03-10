const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: String,
    value: Number,
    description: String,
    location: String,
    category: String,
    date: Object,
        
    
})
module.exports = mongoose.model('Item', ItemSchema);
// {
//     value: randomNumber(1000),
//     isExpense: randomNumber(2) ? true : false,
//     id: uuidv4(),
//     title: titles[randomNumber(titles.length)],
//     description: titles[randomNumber(titles.length)],
//     date: dayjs()
//         .set("month", randomNumber(12))
//         .set("day", randomNumber(28))
//         .set("year", 2024),
//     category: titles[randomNumber(titles.length)],
// }