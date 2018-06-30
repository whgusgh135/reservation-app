const express = require("express");
const router = express.Router({ mergeParams: true});

const { createReservation, getReservation, deleteReservation } = require("../handlers/reservations");

router.route("/").post(createReservation);

router.route("/:reservation_id").get(getReservation).delete(deleteReservation);

module.exports = router;