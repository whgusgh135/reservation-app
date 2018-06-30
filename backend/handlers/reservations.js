const db = require("../models");

exports.createReservation = async function(req, res, next) {
    try {
        let reservation = await db.Reservation.create({
            day: req.body.day,
            time: req.body.time,
            user: req.params.id
        })
        let foundUser = await db.User.findById(req.params.id);
        foundUser.reservations.push(reservation.id);
        await foundUser.save();
        let foundReservation = await db.Reservation.findById(reservation._id).populate("user", {
            username: true
        });
        return res.status(200).json(foundReservation);
    } catch(err) {
        return next(err);
    }
}

exports.getReservation = async function(req, res, next) {
    try {
        let reservation = await db.Reservation.findById(req.params.reservation_id)
        return res.status(200).json(reservation);
    } catch(err) {
        return next(err);
    }
}

exports.deleteReservation = async function(req, res, next) {
    try {
        let foundReservation = await db.Reservation.findById(req.params.reservation_id);
        await foundReservation.remove();
        return res.status(200).json(foundReservation);
    } catch(err) {
        return next(err);
    }
}