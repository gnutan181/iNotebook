const mongoose = require('mongoose')
module.exports =async()=>{
    // const mongoUri='mongodb+srv://nutan:690vZyKVIHHpmhgQ@cluster0.ahgp0m1.mongodb.net/?retryWrites=true&w=majority';
    const mongoUri='mongodb+srv://nutang:Ow3uknCW08RJchs5@cluster0.qqzq0fc.mongodb.net/?retryWrites=true&w=majority'
    try {
      const connect =  await mongoose.connect(mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser : true
      }) ;

      console.log(`Mongodb Connected : ${connect.connection.host}`)
      
    } catch (error) {
        console.log(error);
        // process.exit(1); // if there is no connection between database then we dont want to further processs
    }

   
  }