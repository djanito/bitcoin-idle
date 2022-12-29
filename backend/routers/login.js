const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// connecting an existing database (handling errors)
const db = new sqlite3.Database('./db/bitcoin_clicker.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database!');
});

// login gestion
router.post('/', function (req, res, next) {
    let email = req.body.logemail;
    let password = req.body.logpass;

    if(email != null && email != "" && password != null && password != "") {
        db.serialize(() => {
            const statement = db.prepare("SELECT * FROM players WHERE login=?;");
            statement.get(email, async (err, result) => {
                if(err) {
                    next(err);
                } else {
                    if(result) {
                        const validpass = await bcrypt.compareSync(password, result['password']);

                        if (validpass) {
                            req.session.loggedin = true;
                            req.session.login = result['login'];
                            req.session.bitcoin = result['bitcoin'];
                            res.redirect("/");
                        } else {
                           res.render('login.ejs', {credentialsError: true}); 
                        }

                    } else {
                        res.render('login.ejs', {credentialsError: true});
                    }
                }
            });
            statement.finalize();

        });
    } else {
        res.status(400).send('Bad request!');
    }
});

router.use('/', function (req, res) {
    if(req?.session?.loggedin == true) {
        res.redirect('/');
    } else {
        res.render('login', {credentialsError: false});
    }
});

module.exports = router;
