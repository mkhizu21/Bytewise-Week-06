const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id});

    res.status(200).json(goals);
});

const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('Please provide a goal');
    }

    const goal = await Goal.create({
        user: req.user.id,
        text: req.body.text
    });

    res.status(200).json(goal);
});

const updateGoals = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(400);
        throw new Error('User not found');
    }

    if(goal.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }
    )

    res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user.id);

    if(!user){
        res.status(400);
        throw new Error('User not found');
    }

    if(goal.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User not authorized');
    }
    
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedGoal);
});

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}