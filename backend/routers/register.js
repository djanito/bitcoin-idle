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


// register gestion
router.post('/check', function (req, res, next) {
    let username = req.body.username;
    if (username != null && username != "") {
        db.serialize(() => {
            // check if the password is okay
            const statement = db.prepare("SELECT login FROM players WHERE login=?;");
            statement.get(username, (err, result) => {
                if(err) {
                    next(err);
                } else {
                    if(result) {
                        res.status(200).send("NOK");
                    } else {
                        res.status(200).send("OK");
                    }
                }
            });
            statement.finalize();
        });
    } else {
        res.status(400).send('Bad request!');
    }
});

// register gestion
router.post('/insert', async function (req, res, next) {
    if (req.session.loggedin) {
        res.redirect('/');
    } else {
        let username = req.body.logusername;
        let password = req.body.logpass;
        let password_confirm = req.body.logpass2;

        const hash = await bcrypt.hashSync(password, 12);

        if(username != null && username != "" && password != null && password != "") {
            db.serialize(() => {
                const statement = db.prepare("INSERT INTO players(login, password, bitcoin) VALUES(?, ?, 0);");
                statement.run(username, hash, (err, result) => {
                    if(err) {
                        next(err);
                    } else {
                        res.redirect("/login");
                    }
                });
                statement.finalize();

            });
        } else {
            res.status(400).send('Bad request!');
        }
    }
});

router.use('/', function (req, res) {
    if(req?.session?.loggedin == true) {
        res.redirect('/');
    } else {
        res.render('register', {credentialsError: false});
    }
});

module.exports = router;
