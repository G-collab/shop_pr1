"use strict"
const router = require("express").Router();
const User = require("../Models/User");
const user = require("../Models/User");
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

//reg
router.post("/register", async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
             process.env.PASS_SEC
        ).toString(),
        });

        try{
    const savedUser = await newUser.save()
    res.status(201).json(savedUser);
    } catch(err) {
            res.status(500).json(err);
    }
});

//log in

router.post("/logn", async (req, res)=>{
    try{
        const user = await User.findOne({ username: req.body.username});
        !user && res.status(401).json("Wrong pass")
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_Sec);
        const OrigPassword = hashedPassword.toString();
        OrigPassword !== req.body.password &&
            res.status(401).json("Wrong pass");

        const { password, ...others} = user._doc;

        res.status(201).json(" Correct");
    }catch(err){
        res.status(500).json(err)
    }

})

module.exports = router