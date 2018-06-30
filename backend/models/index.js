const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://bpa1991:hcho1790@ds123151.mlab.com:23151/reservation-app", {
    keepAlive: true
});

module.exports.User = require("./user");
module.exports.Reservation = require("./reservation");