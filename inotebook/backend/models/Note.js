const mongoose = require('mongoose')
const { Schema,model } = mongoose;



// jo hamra user uske notes loi or na dekh paye 
 const NotesSchema = new Schema({

    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },// hum user naam ke model ki userid rakh rha hu
    // ObjectId . A SchemaType is just a configuration object for Mongoose. An instance of the mongoose. ObjectId SchemaType doesn't actually create MongoDB ObjectIds, it is just a configuration for a path in a schema.
        title :{
            required : true,
            type : String
        },
      
        discription :{
            required : true,
            type : String
        },
        tag :{
         type : String,
            default:"General"
        },
        date :{
            type : Date,
            default:Date.now
        }
      }
    );

module.exports = mongoose.model('notes',NotesSchema )