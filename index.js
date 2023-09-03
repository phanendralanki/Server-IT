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
// const crazyOutputPost = require("./EngineersModels/CrazyOutputModel")
const QuizSchema = require("./EngineersModels/TechnicalQuizSchema");
const PPTSchema = require("./EngineersModels/PPTSchema");
const CrazyOutputPost = require('./EngineersModels/CrazyOutputModel');

//middlewares
app.use(express.json());
app.use(cors());

//routes
//get - to get
//post - to add some data to server
//put - to update the data
//delete - to delete

app.get('/',(req,res)=>{
    res.json({message:"welcome to my server"});
})

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
        year:req.body.year,
        branch:req.body.branch,
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

//ROUTE 4 : Update Data
// app.put('/update-quiz/:id',async(req,res)=>{
    
//     let updateQuiz = await QuizSchema.findByIdAndUpdate(req.params.id);
//     if(!updateQuiz){
//         res.status(404).json({message:"No Data found"});
//     }
//     // if(!req.body.regno && !req.body.branch && !req.body.year){
//     //     res.status(200).json({ message: "updated successfully" });
//     // }
//     else if(!req.body.regno && !req.body.year){
//         updateQuiz.branch = req.body.branch; //branch
//     }else if(!req.body.regno && !req.body.branch){
//         updateQuiz.year = req.body.year; //year
//     }else if(!req.body.year && !req.body.branch){
//         updateQuiz.regno = req.body.regno; //regno
//     }else if(!req.body.regno){
//         updateQuiz.year = req.body.year;
//         updateQuiz.branch = req.body.branch; 
//     }else if(!req.body.year){
//         updateQuiz.regno = req.body.regno;
//         updateQuiz.branch = req.body.branch;
//     }else if(!req.body.branch){
//         updateQuiz.regno = req.body.regno;
//         updateQuiz.year = req.body.year;
//     }else{
//          updateQuiz.regno = req.body.regno;
//          updateQuiz.branch = req.body.branch;
//          updateQuiz.year = req.body.year;
//     }
//     await updateQuiz.save();
//     res.status(200).json({message:"updated successfully"});
// })




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
app.post("/post-poster",async(req,res)=>{
  let regId = await PosterSchema.findOne({ regno: req.body.regno });
  if (regId) {
    return res
      .status(400)
      .json({ message: "Registration number already exists" });
  }
    let poster = new PosterSchema({
        regno:req.body.regno,
        year:req.body.year,
        branch:req.body.branch,
    });

    await poster.save();
    res.json({message:"Registered Successfully",poster});
});

//ROUTE 2: To Get all Data
app.get("/get-poster", async (req, res) => {
  let getPoster = await PosterSchema.find();
  if (!getPoster) {
    res.status(404).json({ message: "No data found" });
  }
  res.json({ getPoster });
});

//ROUTE 3: To Delete Data
app.delete("/delete-poster/:id", async (req, res) => {
  let deletePoster = await PosterSchema.findByIdAndDelete(req.params.id);
  if (!deletePoster) {
    res.status(404).json({ message: "No Data Found" });
  }
  res.status(200).json({ message: "Delete Successfully" });
});


//ROUTE 4: To Update Data
// app.put("/update-poster/:id", async (req, res) => {
//   let updatePoster = await PosterPresentation.findByIdAndUpdate(req.params.id);
//   if (!updatePoster) {
//     res.status(404).json({ message: "No Data found" });
//   }
//    else if (!req.body.regno && !req.body.year) {
//     updatePoster.branch = req.body.branch; //branch
//   } else if (!req.body.regno && !req.body.branch) {
//     updatePoster.year = req.body.year; //year
//   } else if (!req.body.year && !req.body.branch) {
//     updatePoster.regno = req.body.regno; //regno
//   } else if (!req.body.regno) {
//     updatePoster.year = req.body.year;
//     updatePoster.branch = req.body.branch;
//   } else if (!req.body.year) {
//     updatePoster.regno = req.body.regno;
//     updatePoster.branch = req.body.branch;
//   } else if (!req.body.branch) {
//     updatePoster.regno = req.body.regno;
//     updatePoster.year = req.body.year;
//   } else {
//     updatePoster.regno = req.body.regno;
//     updatePoster.branch = req.body.branch;
//     updatePoster.year = req.body.year;
//   }
//   await updatePoster.save();
//   res.status(200).json({ message: "updated successfully" });
// });

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

//ROUTE-4: To Update Data
// app.put("/update-ppt/:id", async (req, res) => {
//   let updatePPT = await PPTSchema.findByIdAndUpdate(req.params.id);
//   if (!updatePPT) {
//     res.status(404).json({ message: "No Data found" });
//   }
//   // if (!req.body.regno && !req.body.branch && !req.body.year) {
//   //   res.json({ message: "Please enter regno or branch or year" });
//   // } 
//   else if (!req.body.regno && !req.body.year) {
//     updatePPT.branch = req.body.branch; //branch
//   } else if (!req.body.regno && !req.body.branch) {
//     updatePPT.year = req.body.year; //year
//   } else if (!req.body.year && !req.body.branch) {
//     updatePPT.regno = req.body.regno; //regno
//   } else if (!req.body.regno) {
//     updatePPT.year = req.body.year;
//     updatePPT.branch = req.body.branch;
//   } else if (!req.body.year) {
//     updatePPT.regno = req.body.regno;
//     updatePPT.branch = req.body.branch;
//   } else if (!req.body.branch) {
//     updatePPT.regno = req.body.regno;
//     updatePPT.year = req.body.year;
//   } else {
//     updatePPT.regno = req.body.regno;
//     updatePPT.branch = req.body.branch;
//     updatePPT.year = req.body.year;
//   }
//   await updatePPT.save();
//   res.status(200).json({ message: "updated successfully" });
// });

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

//ROUTE-4: To Update Data



/*
    =========================
     END - crazy output 
    ========================
 */

//listen server
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})