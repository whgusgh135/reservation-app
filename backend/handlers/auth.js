const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async function(req, res, next) {
    try {
        let user = await db.User.create(req.body);
        let { id, username } = user;
        let token = jwt.sign({
            id,
            username
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            token
        });
    } catch(err) {
        if(err.code === 11000) {
            err.message = "Sorry, that username is taken.";
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

exports.signin = async function(req, res, next) {
    try{
        let user = await db.User.findOne({
            username: req.body.username
        });
        let { id, username } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) {
            let token = jwt.sign({
                id,
                username
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalide Username/Password."
            });
        }
    } catch(err) {
        return next({
            status: 400,
            message: "Invalid Username/Password."
        })
    }   
}