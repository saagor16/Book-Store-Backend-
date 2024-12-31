const express =  require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');

const router =  express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY

router.post("/admin", async (req, res) => {
    const {username, password} = req.body;
    try {
        const admin =  await User.findOne({username});
        if(!admin) {
            res.status(404).send({message: "Admin not found!"})
        }
        if(admin.password !== password) {
            res.status(401).send({message: "Invalid password!"})
        }
        
        const token =  jwt.sign(
            {id: admin._id, username: admin.username, role: admin.role}, 
            JWT_SECRET,
            {expiresIn: "1h"}
        )

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })
        
    } catch (error) {
       console.error("Failed to login as admin", error)
       res.status(401).send({message: "Failed to login as admin"}) 
    }
})

module.exports = router;

// '141f5150cd2553f316a3321d17cc7fd218611d1c224bd1b72da77ef45ede68d3add3af148101ac06c244b6d128493ebf7d2ca27ef812c0b9ee3b0cef0d8d4e22'