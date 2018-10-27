var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname + '/public/'));

var reservations = [{
        customerName: "James Bond",
        phoneNumber: "512-123-4567",
        customerEmail: "james.bond@gmail.com",
        customerID: 1,
    },
    {
        customerName: "Ronald McDonald",
        phoneNumber: "512-123-1234",
        customerEmail: "ronald.mcdonald@gmail.com",
        customerID: 2,
    }
];

var waitlists = [{
    customerName: "Andrew Klatzke",
        phoneNumber: "512-182-9182",
        customerEmail: "andrew.klatzke@gmail.com",
        customerID: 6,
}]

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "public/view.html"));
});

app.get("/make", function (req, res) {
    res.sendFile(path.join(__dirname, "public/make.html"));
});


app.get("/api/reservations", function (req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlists);
});

app.get("/api/reservations/:reservation", function (req, res) {
    var tables = req.params.reservation;

    console.log(tables);

    for (var i = 0; i < reservations.length; i++) {
        if (tables === reservations[i].routeName) {
            return res.json(reservations[i]);
        }
    }

    return res.json(false);
});

app.post("/api/reservations", function (req, res) {
    var newreservation = req.body;

    newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newreservation);

    reservations.push(newreservation);

    res.json(newreservation);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
