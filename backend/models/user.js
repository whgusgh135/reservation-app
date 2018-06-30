const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reservation"
    }]
});

// hash password before saving to database
userSchema.pre("save", async function(next) {
    try {
        if(!this.isModified("password")) {
            return next();
        }
        let hash = await bcrypt.hashSync(this.password, 14);
        this.password = hash;
        return next();
    } catch (err) {
        return next(err);
    }
});

// check user password input with hashed password in database
userSchema.methods.comparePassword = async function(userInput, next) {
    try {
        let isMatch = await bcrypt.compareSync(userInput, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;