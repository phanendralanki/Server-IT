const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    regno: String,
    mobile:String,
    branch:String,
    year:String
},
{
    timestamps:true
}
);

const TechnicalQuizSchema = mongoose.model("TechnicalQuizSchema",QuizSchema);
module.exports = TechnicalQuizSchema;