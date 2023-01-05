const express = require('express');
const router = express.Router();


router.use('/', function (req, res) {
    req.session.loggedin = false;
    res.redirect('/');
});

module.exports = router;
