const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3002;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/bookings", db.getBookings);
app.get("/bookings/:id", db.getBookingById);
app.post("/bookings", db.createBooking);
app.put("/bookings", db.updateBooking);
app.delete("/bookings", db.deleteBooking);

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}.`);
});
