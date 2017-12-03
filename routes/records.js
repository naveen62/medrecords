var express = require("express");
var router = express.Router({mergeParams: true});
var Record = require("../models/record");
var passport = require("passport");


router.get('/records',isLoggedIn, function(req, res) {
    Record.find({userid: req.user._id}, function(err, records) {
        if(err) {
            console.log(err);
            res.redirect('/user/sigin');
        } else {
            res.render('records/list', {records: records});
        }
    })
})
router.post('/records/new', function(req, res) {
    var record = {
        hospital: req.body.hospital,
        doctor: req.body.doctor,
        username: req.user.username,
        tablets: req.body.tab,
        disease: req.body.disease,
        bloodTest: req.body.test,
        totalCost: req.body.cost
    };
    Record.create(record, function(err, record) {
        if(err) {
            console.log(err);
            res.redirect('/records');
        } else {
            record.userid = req.user._id;
            record.save(function() {
                req.flash('success', 'New record added successfully')
                res.redirect('/records');
            })
        }
    })
})
router.get('/records/:id', function(req, res) {
    Record.findById(req.params.id, function(err, record) {
        if(err) {
            console.log(err);
            res.redirect('back');
        } else {
            res.render('records/show', {record: record})
        }
    })
})
router.put('/records/:id', function(req, res) {
        var record = {
        hospital: req.body.hospital,
        doctor: req.body.doctor,
        username: req.user.username,
        tablets: req.body.tab,
        disease: req.body.disease,
        bloodTest: req.body.test,
        totalCost: req.body.cost
    }; 
    Record.findByIdAndUpdate(req.params.id, record, function(err, result) {
        if(err) {
            console.log(err);
            res.redirect('back');
        } else {
            req.flash('success', 'record has been edited')
            res.redirect('/records/' + req.params.id)
        }
    })
})
router.delete('/records/:id', function(req, res) {
    Record.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
            res.redirect('back')
        } else {
            req.flash('success', 'record has been deleted')
            res.redirect('/records')
        }
    })
})
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/user/signin')
    }
}

module.exports = router;