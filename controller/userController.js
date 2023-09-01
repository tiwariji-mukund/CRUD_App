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
        req.flash('error', 'Password did not match');
        return res.redirect('/signup');
    }
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            await User.create(req.body);
            req.flash('success', 'new user created');
            return res.redirect('/');
        }
        else {
            req.flash('error', 'Email is already in use');
            return res.redirect('/');
        }
    }
    catch (err) {
        req.flash('error');
        return res.redirect('back');
    }
}

module.exports.create_session = (req, res) => {
    req.flash('success', 'welcome to your profile');
    return res.redirect('/user/app');
}

module.exports.sign_out = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'log out of the account');
        return res.redirect('/');
    })
}