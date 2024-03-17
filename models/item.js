const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: String,
    value: Number,
    description: String,
    location: String,
    category: String,
    date: Object,
    isExpense: Boolean,
        
    
})
module.exports = mongoose.model('Item', ItemSchema);
