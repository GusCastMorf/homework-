const { User, Thoutght } = require('../models');
const mongoose = require('mongoose');

module.exports = {
    async getUsers(req, res) {
        try{
            const userData = await User.find();
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getUserById(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: "Invalid user ID format" });
            }
    
            const user = await User.findById(req.params.id).populate('thoughts friends');
    
            if (!user) {
                return res.status(404).json({ message: "User not found" }); // 🔹 Return 404 instead of `null`
            }
    
            res.json(user);
        } catch (err) {
            console.error("Error fetching user:", err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            // Validate if ID is a valid MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ message: "Invalid user ID format" });
            }
    
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,  
                req.body,
                { new: true, runValidators: true }
            );
    
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.json(updatedUser);
        } catch (err) {
            console.error("Error updating user:", err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const { userId, friendId } = req.params;
    
            // Validate both userId and friendId as valid ObjectIds
            if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
                return res.status(400).json({ message: "Invalid user ID or friend ID format" });
            }
    
            // Find the user and update their friends list
            const user = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { friends: friendId } }, // Prevent duplicate friends
                { new: true }
            );
    
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
    
            res.json(user);
        } catch (err) {
            console.error("Error adding friend:", err);
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};

