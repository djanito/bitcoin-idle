const express = require('express');
const router = express.Router();
const db = require('../db/db');

db.connectDB();

const date = new Date();
date.setHours(date.getHours() + 1);


router.use('/game.ejs', function (req, res) {
    res.redirect('/');
});

router.use('/', function (req, res) {
    res.locals.req = req;
    console.log(req.session.loggedin)
    db.getComponents().then(rows => {
        res.render('game', { data: { components: rows, loggedin: req.session.loggedin} });
    });
});

router.use((err, req, res, next) => {
    res.status(503);
    res.send('Something is wrong: '  + err);
 });

// 404
router.use('*', function(req, res){
    res.status(404);
    res.sendFile("404.html", {root: "../frontend"});
});

module.exports = router;
