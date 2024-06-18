const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/userModel');

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password)
        let userExist = await User.findOne({ Email: email })
        console.log('userExist' + userExist)
        if (userExist) {
            return res.json({ status: false, error: "User already exist" })
        } else {

            let hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword)
            const user = await User.create({
                Name: name,
                Email: email,
                Password: hashedPassword
            })
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
            res.json({ status: true, user, token })
        }
    } catch (err) {
        console.log(err);
        res.json({ status: false, error: "Something went wrong" })
    }
}

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)
        let user = await User.findOne({ Email: email });
        if (!user) {
            return res.json({ status: false, error: "User not found!" })
        }
        console.log(user)
        console.log('userdefinedpassword' + password)
        console.log('realpassword' + user.Password)
        let isPasswordValid = await bcrypt.compare(password, user.Password);
        if (isPasswordValid) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
            return res.json({ status: true, user, token })
        } else {
            return res.json({ status: false, error: "Password doesn't match!" })
        }

    } catch (err) {
        console.log(err);
    }
}

const updateProfile = async (req,res)=>{
    try{
        const { id,name,email,phone } = req.body;
        const userData = await User.findOne({Email:email});
        const image = req.file? req.file.filename:userData.Image;
        console.log(image)
        const user = await User.findOneAndUpdate({_id:id},{$set:{Name:name,Email:email,Phone:phone,Image:image}},{ new: true });
        console.log('user',user)
        res.json({status:true,user})
    }catch(error){
        console.log(error);
    }
}

module.exports = { signUp, logIn, updateProfile }