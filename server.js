const express = require("express");
const cors = require("cors");
const db = require('./app/config/dbConfig')
const authRoutes = require("./app/routes/auth.routes")
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

db.sequelize.authenticate()
    .then(() => {
        console.log("Database Connection Successful");
    }).catch (err => {
        console.log(err);
    })

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Yes Resyncing to the database has been done");
    }).catch (err => {
        console.log(err);
    })

app.use(express.json())
app.use(cors(corsOptions));

// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ibk application." });
});
app.use("/api/v1/auth", authRoutes)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong with the Server"
  return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});