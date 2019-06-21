'use strict';

const { Credential } = require('../config/sequelize')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const privateKey = process.env.PRIVATE_KEY;

const generateToken = userId => {
    return { userid: userId };
}

exports.saveCredentials = (req, res) => {
    if (req.params.userid != req.body.userid) {
        res.status(400).send("user id in url and body not matching");
    } else if (!req.body.password) {
        res.status(422).send("password required");
    } else {
        bcrypt.hash(req.body.password, saltRounds)
            .then(hash => { return Credential.upsert({ userid: req.body.userid, password: hash }) })
            .then(created => { res.sendStatus(created ? 201 : 200) })
            .catch(err => res.status(500).send(err.message));
    }
}

exports.createToken = (req, res) => {
    Credential
        .findByPk(req.body.userid)
        .then(credential => {
            bcrypt
                .compare(req.body.password, credential.password)
                .then(correctPassword => {
                    correctPassword
                        ? res.status(201).send(jwt.sign(generateToken(credential.userid), privateKey))
                        : res.status(403).send("wrong user id or password");
                })
                .catch(() => res.status(400).send("password required"));
        })
        .catch(() => res.status(403).send("wrong user id or password"));
}

exports.verifyToken = (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, privateKey);
        res.status(200).send(decoded);
    } catch (err) {
        res.status(404).send("invalid token");
    }
}
