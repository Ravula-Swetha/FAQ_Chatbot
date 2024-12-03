const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGOBD_URI, {useNewUrlParser : true, useUnifiedTopology : true});
        console.log("Connected to database Successfully");
    }
    catch(err){
        console.log("Error connecting to mongoDB: ", err)
    } ;
};

module.exports = connectDb;