var userLogin = require('../models/model_login')
const user = require('../models/model_users')
const sc2 = require('sc2-sdk');
var api = sc2.Initialize({
    app: 'demo-app',
    callbackURL: 'http://localhost:3000',
    //callbackURL: 'http://localhost:4200/api/v1/login/token',
    accessToken: 'access_token',
    scope: ['vote', 'comment'],
});
module.exports = (function () {
    var router = require('express').Router();
    router.post('/', function (req, res) {
        if (req.body.access_token && req.body.username) {
            userLogin.findOne({ username: req.body.username }).lean().exec((session) => {
                if (!session) {
                    new userLogin(req.body).save(function (err) {
                        if (err) {
                            res.status(500).send(`${err.message}`)
                        }
                        else {
                            api.setAccessToken(req.body.access_token);
                            api.me(function (err, res) {
                                if (res) {
                                    delete res._id
                                    user.findOneAndUpdate({ user: res.user }, res, { upsert: true }, function (err, doc) {

                                    })
                                    // const user = JSON.stringify(res, undefined, 2);
                                    // document.getElementById('userDetailsJSON').innerHTML = user;
                                }
                            });

                            res.status(200).send({ status: 'success', data: 'saved successfully' })
                        }


                    })
                }
                else {
                    req.session.access_token = session.access_token
                    res.status(200).send({ status: 'success', data: access_token })
                }

            },
                (err) => {
                    res.status(400).send({ status: 'error', message: 'System is unavailable' })
                })

        }
        else {
            res.status(400).send({ status: 'error', message: 'login failed' })
        }
    })
    router.get('/', function (req, res) {
        if (req.query.username) {
            userLogin.findOne({ username: req.query.username }, function (err, session) {
                if (err) {
                    res.status(500).send({
                        status: 'error',
                        message: 'System is unavailable please try after some time'
                    })

                }
                else if (session) {
                    res.status(200).send({ status: 1 })
                }
                else {
                    res.status(200).send({ status: 0 })
                }

            })
        }
        else {
            res.status(400).send({ status: 0 })
        }
    })
    return router
})()

