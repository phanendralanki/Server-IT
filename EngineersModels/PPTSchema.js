const mongoose = require('mongoose');

const PPTSchema = new mongoose.Schema({
    regno:String,
    year:String,
    branch:String
},
{
    timestamps:true 
}
);

const PPT = mongoose.model("ppt",PPTSchema);
module.exports = PPT;