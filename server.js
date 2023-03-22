const express = require("express");
const cors = require("cors");
const db = require('./app/config/dbConfig')
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Yes Resyncing to the database has been done");
    }).catch (err => {
        console.log(err);
    })

// db.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

//   db.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ibk application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});