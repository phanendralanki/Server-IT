const mongoose = require('mongoose');

const MONGO_URI =
  "";

const connectDb = async () =>{
    const connection = await mongoose.connect(MONGO_URI);
    if(connection) console.log('Database Connected');
    else console.log('Database connection failed');
}

module.exports = {connectDb};