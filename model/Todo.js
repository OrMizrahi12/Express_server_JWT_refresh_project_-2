const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todo:
    {
        type: String,
        required: true
    },
    Completed:
    {
        type: Boolean,
        required: true
    },
    userId:
    {
        type: String,
        required: true  
    }
    
})

module.exports = mongoose.model("Todo", todoSchema)