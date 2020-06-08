const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PWD);

//! Sync err handler
process.on("uncaughtException", (err) => {
  console.log(
    "🚩 UncaughtException Error! Shutting down...",
    err.name,
    err.message
  );
  process.exit(1);
});

const app = require("./app");

//! Connect DB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`😁 DB is connected!`);
  });

//! Init server
const server = app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`App listening on PORT  + ${PORT}, ${process.env.PW}`);
});

//! Async err handler
process.on("unhandledRejection", (err) => {
  console.log(
    `🚩 Unhandled rejection error! Shutting down...`,
    err.name,
    err.message
  );

  server.close(() => {
    process.exit(1);
  });
});

//! Heroku auto shutdown handler
process.on("SIGTERM", () => {
  console.log(` Sigterm received. Shutting down...`);

  server.close(() => {
    console.log(`🚩 Server closed gracefully.`);
  });
});
