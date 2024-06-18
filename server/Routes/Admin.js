const express = require('express');
const router = express.Router();
const { login,getUser,addUser,loadUpdateUser,editUser,deleteUser } = require('../Controller/adminController');

router.post('/login',login);
router.get('/',getUser);
router.post('/adduser',addUser);
router.post('/loadupdate',loadUpdateUser);
router.post('/edituser',editUser);
router.post('/deleteuser',deleteUser);

module.exports = router;