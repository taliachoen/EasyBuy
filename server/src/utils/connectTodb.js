const mongoose = require("mongoose");


async function  connectToDb() {
    const uri = "mongodb+srv://eyal:eyal123456@e-commerce.fsngodq.mongodb.net/test2"
    try {
      await mongoose.connect(uri)
      console.log("db connected")
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectToDb;