const { Question, User, Answer } = require('../models');
const express = require('express');
const { Op } = require('sequelize');

const getQuestions = async (req, res) => {
    try {
        const { filter = '', sortBy = 'createdAt', order = 'DESC' } = req.query;
        const userRole = req.user.role;

        let whereClause = {}, ansRequired = false;
        if (filter == 'answered') {
            ansRequired = true;
        } else if (filter == 'unanswered') {
            ansRequired = false;
        }

        if (userRole !== 'admin') {
            whereClause.isActive = true;
        }

        const questions = await Question.findAll({
            where: whereClause,
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Answer, include: [{ model: User, attributes: ['id', 'username'] }] ,required:ansRequired}
            ],
            order: [[sortBy, order]]
        });
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions' });
    }
};

const createQuestion =async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User authentication failed: No user ID found' });
        }

        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const question = await Question.create({
            userId: req.user.id,
            title,
            description,
        });
        res.status(201).json({ message: 'Question created', question });
    } catch (error) {
        console.error('Error creating question:', error.message);
        res.status(500).json({ error: 'Failed to create question', details: error.message });
    }
};
const getTotalQuestions = async (req, res) => {
  try {
    const totalQuestions = await Question.count();
    res.json({ totalQuestions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAnsweredQuestions = async (req, res) => {
  try {
    const answeredQuestions = await Question.count({
      where: {
        comments : {[Op.gt]:0}
      
      }
    });
    res.json({ answeredQuestions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUnansweredQuestions = async (req, res) => {
  try {
    const unansweredQuestions = await Question.count({
            where: {
                comments: { [Op.eq]: 0 }
            }
        });
    res.json({ unansweredQuestions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.count();
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAdminsideQuestions=async (req, res) => {
   try {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
        const filter = req.query.filter || 'all';
        const sortBy = req.query.sortBy || 'createdAt';
        const order = req.query.order || 'DESC';
        console.log('Fetching questions with filter:', filter, 'sortBy:', sortBy, 'order:', order);

        let queryOptions = {
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Answer, attributes: ['id', 'content', 'createdAt', 'userId'] }
            ],
            order: [[sortBy, order]],
            attributes: {
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Answers.id')), 'answerCount']
                ]
            },
            group: ['Question.id', 'User.id', 'Answers.id']
        };

        if (filter === 'answered') {
            queryOptions.include[1] = { model: Answer, required: true };
        } else if (filter === 'unanswered') {
            queryOptions.include[1] = { model: Answer, required: false };
            queryOptions.having = sequelize.literal('COUNT("Answers"."id") = 0');
        }

        const questions = await Question.findAll(queryOptions);
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Error fetching questions' });
    }
};

const updateQuestiontoggle= async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    const questionId = req.params.id;

    if (!questionId || isNaN(questionId) || parseInt(questionId) <= 0) {
      return res.status(400).json({ message: 'Invalid question ID format' });
    }
    const parsedId = parseInt(questionId);
    const question = await Question.findByPk(parsedId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.isActive = !question.isActive;
    await question.save();

    res.json({ isActive: question.isActive });
  } catch (error) {
    console.error('Error toggling question active status:', error); // Log the actual error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports={
  getQuestions,createQuestion,getTotalQuestions,getAnsweredQuestions,getUnansweredQuestions,getTotalUsers,getAdminsideQuestions,updateQuestiontoggle
}