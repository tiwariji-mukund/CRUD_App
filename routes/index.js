const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/userController');

router.get('/', passport.isAuthenticate, userController.sign_in);
router.get('/signup', passport.isAuthenticate, userController.sign_up);
router.post('/create-user', userController.create_user);
router.post('/create-session', passport.authenticate('local', { failureRedirect: '/' }), userController.create_session);
router.get('/logout', userController.sign_out);

router.use('/user', require('./app'));

module.exports = router;