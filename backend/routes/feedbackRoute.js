const express = require('express');
const FeedbackModel = require('../models/feedback.js');
const feedbackRouter = express.Router();

feedbackRouter.post('/', (req, res)=>{
    const {feedback} = req.body;
   
    if(!feedback){
        console.log("All the fields are required");
        res.status(404).json({error: "All the fields are required"});
    }

    try{
        const newFeedback = new FeedbackModel({feedback});
        newFeedback.save();
        console.log("Feedback Saved Successful");
        res.status(201).json({message: "Feedback Saved Successful"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = feedbackRouter;