const { Pool, Client } = require(`pg`);
const pool = new Pool({
  user: `rarovhlw`,
  host: `tai.db.elephantsql.com`,
  database: `rarovhlw`,
  password: `QfXIYy8FsDwy_l4nVXPJCwKRWOtLKWEt`,
  port: 5432,
});

// GET ALL BOOKINGS

function getBookings(request, response) {
  pool.query(`SELECT * FROM bookings ORDER BY id ASC`, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result.rows);
    response.status(200).json(result.rows);
  });
}

//GET BOOKING BY ID

const getBookingById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(`SELECT * FROM bookings WHERE id = ${id}`, (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).json(result.rows);
  });
};

//CREATE BOOKING

const createBooking = (request, response) => {
  const { name, email, fromDate, toDate, status } = request.body;

  pool.query(
    `INSERT INTO bookings (name, email, fromdate, todate, status) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [name, email, fromDate, toDate, status],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Booking added with ID: ${result.rows[0].id}`);
    }
  );
};

//UPDATE BOOKING

const updateBooking = (request, response) => {
  const id = parseInt(request.params.id);
  const status = parseInt(request.params.status);

  pool.query(
    `UPDATE bookings SET status = $2 WHERE id = $1`,
    [id, status],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Booking status modified with ID: ${id}`);
    }
  );
};

//DELETE BOOKING

const deleteBooking = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(`DELETE FROM bookings WHERE id = $1`, [id], (error, result) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Booking deleted with ID: ${id}`);
  });
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
