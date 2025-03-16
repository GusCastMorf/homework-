const { Thought, User } = require('../models');
const mongoose = require('mongoose');

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const { thoughtText, username, userId } = req.body;
    
            // Validate ObjectId format for userId
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ message: "Invalid user ID format" });
            }
    
            // Create the new thought
            const thought = await Thought.create({ thoughtText, username });
    
            // Find user and push the thought ID into their thoughts array
            const user = await User.findByIdAndUpdate(
                userId,
                { $push: { thoughts: thought._id } },
                { new: true }
            );
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.status(201).json(thought);
        } catch (err) {
            console.error("Error creating thought:", err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(
                req.params.id,
                { $set: req.body }, 
                { new: true, runValidators: true } 
            );
    
            if (!updatedThought) {
                return res.status(404).json({ message: "Thought not found" });
            }
    
            res.json(updatedThought);
        } catch (err) {
            console.error("Error updating thought:", err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);
            if (!thought) return res.status(404).json({ message: 'No thought found with this id!' });
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body } },
                { new: true }
            );
            if (!thought) return res.status(404).json({ message: 'No thought found with this id!' });
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) return res.status(404).json({ message: 'No thought found with this id!' });
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

};

