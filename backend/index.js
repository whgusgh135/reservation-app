require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./handlers/error");
const db = require("./models");
const { loginRequired, correctUserRequired } = require("./middleware/auth");

const PORT = 8081;
// requiring routes
const authRoutes = require("./routes/auth");
const reservationsRoutes = require("./routes/reservations");

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// user routes
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/reservations", loginRequired, correctUserRequired, reservationsRoutes);
app.get("/api/reservations", async function(req, res, next) {
    try {
        let reservations = await db.Reservation.find().populate("user", {
            username: true
        });
        return res.status(200).json(reservations);
    } catch(err) {
        return next(err);
    }
});


app.get("/", function(req, res) {
    res.send("connected");
});

// when use cannot find routes
// error handler
// next is middleware function
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});
app.use(errorHandler);

app.listen(8081, function() {
    console.log(`Server is starting on port ${PORT}`);
});