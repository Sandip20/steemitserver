
const { Client } = require('dsteem');

const client = new Client('https://api.steemit.com');

module.exports = (function () {
    const router = require('express').Router();
    router.get('/', function (req, res) {

        var filter = req.query.filter
        const query = {
            tag: filter,
            limit: 5,
        };
        client.database
            .getDiscussions(filter, query)
            .then(result => {
                res.status(200).send({ status: "success", data: result });
            }).catch(err => {
                res.status(400).send({ status: "error", message: err })
            });

    })
    return router
})()