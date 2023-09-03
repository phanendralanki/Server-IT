const mongoose = require('mongoose');

const MONGO_URI =
  "mongodb+srv://phanendra:Lgpmvf12@cluster0.e7owhkl.mongodb.net/engineersday?retryWrites=true&w=majority";

const connectDb = async () =>{
    const connection = await mongoose.connect(MONGO_URI);
    if(connection) console.log('Database Connected');
    else console.log('Database connection failed');
}

module.exports = {connectDb};