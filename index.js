const express = require('express');
const cors = require('cors');

const {connectDb} = require('./connections');

//initiating app
const app = express();
const port = 5000;

//connectDatabase
connectDb();

//schemas 
const PosterSchema = require("./EngineersModels/PosterPresentations");
const QuizSchema = require("./EngineersModels/TechnicalQuizSchema");
const PPTSchema = require("./EngineersModels/PPTSchema");
const CrazyOutputPost = require('./EngineersModels/CrazyOutputModel');

//middlewares
app.use(express.json());
app.use(cors());

/* 
    ======================
      for Technical quiz
    ======================
*/

//Route-1:POST DATA
app.post('/post-quiz',async(req,res)=>{
  let regId = await QuizSchema.findOne({ regno: req.body.regno });
  if (regId) {
    return res
      .status(400)
      .json({ message: "Registration number already exists" });
  }
    let quiz = new QuizSchema({
        regno:req.body.regno,
        mobile:req.body.mobile,
        year:req.body.year,
        branch:req.body.branch
    });

    await quiz.save();
    res.json({message:"Registered Successfully",quiz});
})

//Route-2 GET DATA
app.get('/get-quiz',async(req,res)=>{
    let getQuiz = await QuizSchema.find();
    if(!getQuiz){
        res.status(404).json({message:"No data found"});
    }
    res.json({getQuiz})
})

//ROUTE 3: Delete Data
app.delete('/delete-quiz/:id',async(req,res)=>{
    let deleteQuiz = await QuizSchema.findByIdAndDelete(req.params.id);
    if(!deleteQuiz){
        res.status(404).json({message:"No Data Found"});
    }
    res.status(200).json({message:"Delete Successfully"});
});


/* 
    ======================
     END - Technical quiz
    ======================
*/



/*
    =============================
     Poster Presentation Start
    =============================
*/

//ROUTE-1: To Post Data
app.post('/post-poster',async(req,res)=>{
  let regId = await PosterSchema.findOne({regno:req.body.regno});
  if(regId){
    return res.status(400).json({message:"Registration number already exists"});
  }
  let present = new PosterSchema({
    regno:req.body.regno,
    mobile:req.body.mobile,
    year:req.body.year,
    branch:req.body.branch,
  });

  await present.save();
  res.json({message:"Registered Successfully",present});
})

//ROUTE 2: To Get all Data
app.get("/get-poster", async (req,res) => {
  let getPoster = await PosterSchema.find();
  if (!getPoster) {
    res.status(404).json({ message: "No data found" });
  }else{
  res.json({ getPoster });
  }
});

//ROUTE 3: To Delete Data
app.delete("/delete-poster/:id", async (req, res) => {
  let deletePoster = await PosterSchema.findByIdAndDelete(req.params.id);
  if (!deletePoster) {
    res.status(404).json({ message: "No Data Found" });
  }
  res.status(200).json({ message: "Delete Successfully" });
});




/* 
    ===========================
     END-Poster Presentation 
    ===========================
*/ 


/* 
    ===========================
      PPT Presentation
    ===========================
*/

//ROUTE-1: Post Data
app.post('/post-ppt',async(req,res)=>{
    const existedId = await PPTSchema.findOne({regno:req.body.regno});
    if(existedId){
      return res.status(400).json({message:"Registration number already exists"})
    }
    let PPT = new PPTSchema({
        regno:req.body.regno,
        mobile:req.body.mobile,
        year:req.body.year,
        branch:req.body.branch
    });

    await PPT.save();
    res.json({message:"Registered Successfully",PPT});
})

//ROUTE-2: To Get Data
app.get('/get-ppt',async(req,res)=>{
    let getppt = await PPTSchema.find();
    if(!getppt){
        res.status(404).json({message:"data not found"});
    }
    res.json({getppt});
})

//ROUTE-3 : To Delete Data
app.delete("/delete-ppt/:id", async (req, res) => {
  let deletePPT = await PPTSchema.findByIdAndDelete(req.params.id);
  if (!deletePPT) {
    res.status(404).json({ message: "No Data Found" });
  }
  res.status(200).json({ message: "Delete Successfully" });
});


/*
    =============================
     END-PPT Presentation
    =============================
*/

/*
    =========================
        crazy output 
    ========================
 */
//ROUTE-1: To Post Data
app.post('/post-crazy',async(req,res)=>{
    const existingId = await CrazyOutputPost.findOne({regno:req.body.regno});
    if(existingId){
      return res
        .status(400)
        .json({ message: "Registration number already exists" });
    }
    let postCrazy = new CrazyOutputPost({
        regno:req.body.regno,
        mobile:req.body.mobile,
        year:req.body.year,
        branch:req.body.branch,
    });

    await postCrazy.save();
    res.json({message:"Registered successfully",postCrazy});
});

//ROUTE-2: To Get Data
app.get("/get-crazy", async (req, res) => {
  
    let getCrazy = await CrazyOutputPost.find();
    if (!getCrazy) {
      res.status(404).json({ message: "No data found" });
    } else {
      res.json({ getCrazy });
    }
  
});


//ROUTE-3: To Delete Data
app.delete("/delete-crazy/:id", async (req, res) => {
  let deleteCrazy = await CrazyOutputPost.findByIdAndDelete(req.params.id);
  if (!deleteCrazy) {
    res.status(404).json({ message: "No Data Found" });
  }
  res.status(200).json({ message: "Delete Successfully" });
});


/*
    =========================
     END - crazy output 
    ========================
 */

//listen server
app.listen(process.env.PORT || 5000, () => {
  console.log(`server is running on port ${port}`);
});