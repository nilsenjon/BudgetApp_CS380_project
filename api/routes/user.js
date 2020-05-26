var express = require('express');
var router = express.Router();
const Joi = require('@hapi/joi');

//----------SCHEMAS----------//
const putUser = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    firstName: Joi.string()
        .alphanum()
        .min(1)
        .max(30)
        .required(),

    lastName: Joi.string()
        .alphanum()
        .min(1)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

const postUser = Joi.object({
    _id: Joi.string().alphanum().min(24).max(24).required(),
    user: {
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30),

        firstName: Joi.string()
            .alphanum()
            .min(1)
            .max(30),

        lastName: Joi.string()
            .alphanum()
            .min(1)
            .max(30),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    }
});

const getUser = Joi.object({
    username: Joi.string()
        .alphanum()
        .max(30),

    firstName: Joi.string()
        .alphanum()
        .max(30),

    lastName: Joi.string()
        .alphanum()
        .max(30),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    _id: Joi.string().alphanum().min(24).max(24),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
});

const searchUser = Joi.object({
    username: Joi.string()
        .alphanum()
        .max(30),

    firstName: Joi.string()
        .alphanum()
        .max(30),

    lastName: Joi.string()
        .alphanum()
        .max(30),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
});

const deleteUser = Joi.object({
    _id: Joi.string().alphanum().min(24).max(24).required()
});

//----------ROUTES----------//
router.put('/', function (req, res) {
    console.log("----------PUT USER----------")
    console.log("Body:", req.body)
    const { error, value } = putUser.validate(req.body);
    if (!error) {
        GLOBAL.db.collection("user").insertOne(req.body, function (err, result) {
            if (err) throw err;
            var ret = {}
            ret.statusCode = 200;
            console.log(result.ops[0]);
            ret.user = result.ops[0]
            ret.message = "Succesfully inserted a user."
            console.log("Return: ", ret)
            res.send(ret)
        });
    } else {
        error.statusCode = 400
        error.message = "User failed input validation."
        console.log("Return: ", error)
        res.send(error)
    }
});

router.post('/', function (req, res) {
    console.log(req.params)
    console.log("----------POST USER----------")
    console.log("Body:", req.body)
    const { error, value } = postUser.validate(req.body);
    if (!error) {
        GLOBAL.db.collection("user").updateOne({ _id: new GLOBAL.ObjectID(req.body._id) }, { $set: req.body.user }, function (err, result) {
            if (err) throw err;
            var ret = {}
            if (result.result.n > 0) {
                ret.statusCode = 200
                ret.message = "Succesfully updated a user."
            } else {
                ret.statusCode = 400
                ret.message = "Failed to update, user's _id was not found."
            }
            console.log("Return: ", ret)
            res.send(ret)
        });
    } else {
        error.statusCode = 400
        error.message = "User failed input validation."
        console.log("Return: ", error)
        res.send(error)
    }
});

router.delete('/', function (req, res) {
    console.log("----------DELETE USER----------")
    console.log("Body:", req.body)
    const { error, value } = deleteUser.validate(req.body);
    if (!error) {
        req.body._id = new GLOBAL.ObjectID(req.body._id)
        GLOBAL.db.collection("user").deleteOne(req.body, function (err, result) {
            if (err) throw err;
            var ret = {}
            if (result.result.n > 0) {
                ret.statusCode = 200
                ret.message = "Succesfully deleted a user."
            } else {
                ret.statusCode = 400
                ret.message = "Failed to delete, user's _id was not found."
            }
            console.log("Return: ", ret)
            res.send(ret)
        });
    } else {
        error.statusCode = 400
        error.message = "User failed input validation."
        console.log("Return: ", error)
        res.send(error)
    }
});

router.post('/search', function (req, res) {
    console.log("----------GET USER/SEARCH----------")
    console.log("Body:", req.body)
    const { error, value } = searchUser.validate(req.body);
    if (!error) {
        Object.keys(req.body).forEach(function (key) {
            req.body[key] = { "$regex": req.body[key] }
        })
        GLOBAL.db.collection('user').find(req.body).toArray(function (err, result) {
            if (err) throw err
            var ret = {}
            ret.statusCode = 200
            ret.users = result
            if(ret.users.length > 0){
                ret.message = ret.users.length + " user(s) matched the search parameters."
            }else{
                ret.message = "No users matched the search parameters."
            }
            res.send(ret)
            console.log("Return: ", ret)
        })
    } else {
        error.statusCode = 400
        error.message = "User failed input validation."
        console.log("Return: ", error)
        res.send(error)
    }
});

router.post('/get', function (req, res) {
    console.log("----------GET USER----------")
    console.log("Body:", req.body)
    const { error, value } = getUser.validate(req.body);
    if (!error) {
        if (req.body._id != null) {
            req.body._id = new GLOBAL.ObjectID(req.body._id)
        }
        GLOBAL.db.collection('user').find(req.body).toArray(function (err, result) {
            if (err) throw err
            var ret = {}
            ret.statusCode = 200
            ret.users = result
            if(ret.users.length > 0){
                ret.message = ret.users.length + " user(s) matched the input parameters."
            }else{
                ret.message = "No users matched the input parameters."
            }
            res.send(ret)
            console.log("Return: ", ret)
        })
    } else {
        error.statusCode = 400
        error.message = "User failed input validation."
        console.log("Return: ", error)
        res.send(error)
    }
});

router.get('/wipe', function (req, res) {
    console.log("----------WIPE USER----------")
    console.log("Body:", req.body)
    GLOBAL.db.collection('user').deleteMany({})
});

module.exports = router;