const express = require('express');
const passport = require('passport');
const router = express.Router();
const homeController = require('../controller/homeController');

router.get('/app', passport.checkAuthentication, homeController.home)
router.post('/create_todo', passport.checkAuthentication, homeController.createTodo) //controller for creating todo list
router.post('/delete_todo', passport.checkAuthentication, homeController.deleteTodo) // controller for deleting the todo list
router.get('/editdata', passport.checkAuthentication, homeController.EditPage);       // controller for getting Edit page
router.post('/edit-todolist', passport.checkAuthentication, homeController.editDetails) // conteoller for Edting todo list

module.exports = router;