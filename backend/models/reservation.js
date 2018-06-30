const mongoose = require("mongoose");
const User = require("./user");

const reservationSchema = new mongoose.Schema({
    day: {
        type: String
    },
    time: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

reservationSchema.pre("remove", async function(next) {
    try {
        let user = await User.findById(this.user)
        user.reservations.remove(this.id);
        await user.save()
    } catch(err) {
        return next(err);
    }
})

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;