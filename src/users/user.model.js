const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // bcrypt এর পরিবর্তে bcryptjs ব্যবহার করছি

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user', // ডিফল্ট মান 'user'
        required: true
    }
});

// Pre-save Hook for Password Hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // যদি পাসওয়ার্ড পরিবর্তন না হয়, পরবর্তী ধাপে যান
    try {
        this.password = await bcrypt.hash(this.password, 10); // পাসওয়ার্ড হ্যাশ করুন
        next();
    } catch (error) {
        next(error); // ত্রুটি থাকলে পরবর্তী ধাপে পাঠান
    }
});

// Model Definition
const User = mongoose.model('User', userSchema);

module.exports = User;



// {
//     "username": "sagor",
//     "password":"123456"
//   }

// {
//     "username": "admin",
//     "password":"123456"
//   }