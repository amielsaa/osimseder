const express = require('express');
const app = express();
const port = 3001;
const encryption = require('./utils/Encryption')
const logger = require('./utils/Logger')
const tokens = require('./utils/JsonWebToken')
const db = require('./models');

const cors = require("cors")
app.use(express.json())
app.use(cors())
//const db = require()

const helloRouter = require("./routes/Hello")
app.use("/", helloRouter)


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

db.sequelize.sync().then(() => {
  app.listen(port, () => {
      console.log("Server running on port 3001");
  }); //function that starts whenever the server starts
});