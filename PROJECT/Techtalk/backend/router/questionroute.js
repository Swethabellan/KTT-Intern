const express = require("express");
const router = express.Router();
const Questions = require("./models/questions");

router.post('/questions',async(req,res) =>{
    const {id,userid,title,description,tags,status}= req.body;
    try{
        const newQuestion = await Questions.create({
            id,
            userid,
            title,
            description,
            tags,
            status,
        })
        res.status(201).json({message: "Question added"})
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
module.exports= router;