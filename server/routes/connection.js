const sc2 = require('sc2-sdk');
const userLogin = require('../models/model_login')
const user = require('../models/model_user')
module.exports = (function () {
    // init steemconnect
    var api = sc2.Initialize({
        app: 'demo-app',
        callbackURL: 'http://localhost:3000',
        //callbackURL: 'http://localhost:4200/api/v1/login/token',
        accessToken: 'access_token',
        scope: ['vote', 'comment'],
    });

    var router = require('express').Router();
    router.get('/', function (req, res) {

        if (req.query.username) {
            userLogin.findOne({ username: req.query.username }, function (err, session) {
                if (session) {
                    api.setAccessToken(session.access_token);
                    api.me(function (err, res) {
                        if (res) {
                            
                            const user = JSON.stringify(res, undefined, 2);
                            document.getElementById('userDetailsJSON').innerHTML = user;
                        }
                    });
                }

            })
        }
        res.status(200).send({ status: "success", url: Link });
    })



    return router;

})();