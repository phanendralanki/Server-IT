const mongoose = require('mongoose');

const crazyOutputSchema = new mongoose.Schema(
    {
    regno:String,
    year:String,
    branch:String,
    },
    {
        timestamps:true
    }

);

const CrazyOutputPost = mongoose.model("CrazyOutputPost",crazyOutputSchema);

module.exports = CrazyOutputPost;