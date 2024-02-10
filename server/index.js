const express = require('express');
const app = express();
const port = 3001;
//const encryption = require('./utils/Encryption')
//const logger = require('./utils/Logger')
//const tokens = require('./utils/JsonWebToken')
const db = require('./models');

const cors = require("cors")
app.use(express.json())
app.use(cors())

// const helloRouter = require("./routes/Hello")
// app.use("/", helloRouter)
const studentRouter = require("./routes/studentRoutes/usersRoute")
app.use("/studentAuth", studentRouter)
const staffRouter = require("./routes/staffRoutes/usersRoute")
app.use("/staffAuth", staffRouter)


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

db.sequelize.sync().then(() => {
  app.listen(port, () => {
      console.log("Server running on port 3001");
  }); //function that starts whenever the server starts
});