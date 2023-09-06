const mongoose = require('mongoose');

const PosterSchema = new mongoose.Schema({
    regno:String,
    mobile:String,
    year:String,
    branch:String,
},
{
    timestamps:true
}
);

const PosterPresentation = mongoose.model("PosterPresentation",PosterSchema);
module.exports = PosterPresentation;


