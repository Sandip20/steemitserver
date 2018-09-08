
module.exports = (function () {
    var router = require('express').Router();
    router.get('/', function (req, res) {
        global.api.me(function (err, doc) {
            if (doc) {
                res.json(doc);
                // const user = JSON.stringify(doc, undefined, 2);

            }
        });

    })
    return router;



})()