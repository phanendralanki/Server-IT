const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    regno: String,
    year:String,
    branch:String
},
{
    timestamps:true
}
);

const TechnicalQuizSchema = mongoose.model("TechnicalQuizSchema",QuizSchema);
module.exports = TechnicalQuizSchema;