var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var passport = require("passport")


router.get('/signup', function(req, res) {
    res.render('user/signup')
})
router.post('/signup', function(req, res) {
    var newUser = new User({username: req.body.username, test: 'hello'})
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash('error', err.message)
            res.redirect('/user/signup')
        } else {
            console.log(user)
            passport.authenticate('local')(req, res, function() {
                res.redirect('/records')
            })
        }
    })
})
router.get('/signin', function(req, res) {
    res.render('user/signin');
})
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/records',
    failureRedirect: '/user/signin',
    failureFlash: true
}), function(req, res) {
    
})
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/user/signin')
})
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/user/signin')
    }
}

module.exports = router;