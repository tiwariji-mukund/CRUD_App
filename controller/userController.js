const User = require('../models/user');

module.exports.sign_in = (req, res) => {
    return res.render('signin', {
        title: 'Log In'
    })
}

module.exports.sign_up = (req, res) => {
    return res.render('signup', {
        title: 'Create Account'
    })
}

module.exports.create_user = async (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        console.log('incorrect password');
        return res.redirect('/');
    }
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            await User.create(req.body);
            console.log('new user created');
            return res.redirect('/');
        }
        else {
            console.log('username is already in use');
            return res.redirect('/');
        }
    }
    catch (err) {
        console.log(`Error in creating account ${err}`);
        return res.redirect('back');
    }
}

module.exports.create_session = (req, res) => {
    console.log('welcome to your profile');
    return res.redirect('/user/app');
}

module.exports.sign_out = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        console.log('signout of the account');
        return res.redirect('/');
    })
}