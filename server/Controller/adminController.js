const express = require('express');
const User = require('../Model/userModel');
const bcrypt = require('bcrypt');
const json = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let userCheck = await User.findOne({ Email: email })
        if (!userCheck) {
            return res.json({ status: false, error: "Incorrect email!" })
        } else {
            let passwordCheck = await bcrypt.compare(password, userCheck.Password);
            if (passwordCheck && userCheck.isAdmin) {
                const token = json.sign({ userId: userCheck._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
                res.json({ status: true, token });
            } else {
                res.json({ status: false, error: "Password doesn't match!" });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (err) {
        console.log(err);
    }
}

const addUser = async (req, res) => {
    try {
        console.log('hiii')
        const { name, email, phone, password } = req.body;
        console.log(name,email,phone,password)
        let userExist = await User.findOne({ Email: email });
        if (userExist) {
            res.json({ status: false, error: "User already exist!" })
        } else {
            await User.create({
                Name: name,
                Email: email,
                Phone: phone,
                Password: await bcrypt.hash(password, 10)
            });
            res.json({ status: true });
        }
    } catch (err) {
        console.log(err);
    }
}

const loadUpdateUser = async (req, res) => {
    try {
        let id = req.body.id;
        const user = await User.findOne({ _id: id });
        res.json({ user });
    } catch (err) {
        console.log(err);
    }
}

const editUser = async (req, res) => {
    try {
        const { name, email, phone, id } = req.body;
        console.log(id)
        let checkUser = await User.find({ Email: email, _id: { $ne: id } });
        console.log(checkUser)
        if (checkUser.length) {
            return res.json({ status: false, error: "Email already exist!" });
        } else {
            const newData = await User.updateOne({ _id: id }, { $set: { Name: name, Email: email, Phone: phone } })
            console.log(newData);
            res.json({ status: true, user: newData[0] });
        }

    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        let id = req.body.id;
        console.log(id)
        const user = await User.deleteOne({ _id: id });
        console.log(user)
        res.json({ status: true });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { login, addUser, getUser, loadUpdateUser, editUser, deleteUser }