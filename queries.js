const { Pool, Client } = require(`pg`);
const pool = new Pool({
  user: `rarovhlw`,
  host: `tai.db.elephantsql.com`,
  database: `rarovhlw`,
  password: `QfXIYy8FsDwy_l4nVXPJCwKRWOtLKWEt`,
  port: 5432,
});

const token = "3b243a78b06c0bf6083c6fdc6909c375";
// GET ALL BOOKINGS

function getBookings(request, response) {
  if (request.headers.token != token) {
    response.status(403).send("Unauthorised access!");
  } else {
    pool.query(`SELECT * FROM bookings ORDER BY id ASC`, (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    });
  }
}

//GET BOOKING BY ID

const getBookingById = (request, response) => {
  if (request.headers.token != token) {
    response.status(403).send("Unauthorised access!");
  } else {
    pool.query(
      `SELECT * FROM bookings WHERE id = ${request.params.id}`,
      (error, result) => {
        if (error) {
          throw error;
        }
        response.status(200).json(result.rows);
      }
    );
  }
};

//CREATE BOOKING

const createBooking = (request, response) => {
  const { name, email, fromDate, toDate, status, price, product } = request.body;
  if (request.headers.token != token) {
    response.status(403).send("Unauthorised access!");
  } else {
    pool.query(
      `INSERT INTO bookings (name, email, fromdate, todate, status, price, product) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [name, email, fromDate, toDate, status, price, product],
      (error, result) => {
        if (error) {
          throw error;
        }
        response
          .status(201)
          .send(`Booking added with ID: ${result.rows[0].id}`);
      }
    );
  }
};

//UPDATE BOOKING

const updateBooking = (request, response) => {
  const { id, status } = request.body;
  if (request.headers.token != token) {
    response.status(403).send("Unauthorised access!");
  } else {
    pool.query(
      `UPDATE bookings SET status = $2 WHERE id = $1 `,
      [id, status],
      (error, result) => {
        if (error) {
          throw error;
        }
        response
          .status(200)
          .send(`Booking status modified with ID: ${id}`);
      }
    );
  }
};

//DELETE BOOKING

const deleteBooking = (request, response) => {
  if (request.headers.token != token) {
    response.status(403).send("Unauthorised access!");
  } else {
    pool.query(
      `DELETE FROM bookings WHERE id = ${request.body.id} RETURNING id`,
      (error, result) => {
        if (error) {
          throw error;
        }
        response
          .status(200)
          .send(`Booking deleted with ID: ${request.body.id}`);
      }
    );
  }
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
