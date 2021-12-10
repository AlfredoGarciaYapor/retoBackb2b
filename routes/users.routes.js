var express = require('express');
var router = express.Router();
const users = require('../controllers/users.controller')

/* GET users listing. */
router.post('/SingUp', users.signUpUser);//ya jala
router.post('/Login', users.getUser);//si jala
router.post('/userInfo', users.getUserInfo);//si jala
router.post('/updateInfo', users.updateUser);//si jala
router.post('/deleteUser', users.removeUser)
router.get('/usersList', users.getUsersList);//si jala

module.exports = router;
