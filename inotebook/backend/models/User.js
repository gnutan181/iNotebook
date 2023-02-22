

const mongoose = require('mongoose')
const { Schema,model } = mongoose;

const userSchema = new Schema({
    name :{
        required : true,
        type : String
    },
    email :{
        required : true,
        type : String,
        unique : true
    },
    password :{
        required : true,
        type : String
    },
    date :{
        type : Date,
        default:Date.now
    }
  
  }
);
const User =  mongoose.model('User',userSchema )
// User.createIndexes();
module.exports = User

// The createIndexes() method creates one or more indexes on the specified collection. It is used to create one or more indexes based on the field of the document. Using this method we can create different types of indexes like text index, 2dsphere index, 2d index, etc.