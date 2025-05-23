const express = require('express');
const router=express.Router();
const authenticateToken=require('../middleware/auth');

const { createAnswer,getAnswers,getUserAnswers,updateAnswerToggle,markCorrect }=require('../controllers/answerController');

router.post('/answers',authenticateToken,createAnswer);
router.get('/answers',authenticateToken,getAnswers);
router.get('/user-answers',authenticateToken,getUserAnswers);
router.put('/answers/:id/toggle-active',authenticateToken,updateAnswerToggle);
router.put('/answers/:id/mark-correct',authenticateToken,markCorrect);


module.exports=router;
