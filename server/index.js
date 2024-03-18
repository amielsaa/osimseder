const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
//const encryption = require('./utils/Encryption')
//const logger = require('./utils/Logger')
//const tokens = require('./utils/JsonWebToken')
const db = require('./models');

const cors = require("cors")
app.use(express.json())
app.use(cors())

// const helloRouter = require("./routes/Hello")
// app.use("/", helloRouter)
const studentRouter = require("./routes/studentRoutes")
app.use("/api/student", studentRouter)
const staffRouter = require("./routes/staffRoutes")
app.use("/api/staff", staffRouter)
const authRouter = require("./routes/auth")
app.use("/api/auth", authRouter)
// const setupRouter = require("./routes/auth/SetupRoute")
// app.use("/setup", setupRouter)

const buildPath = path.normalize(path.join(__dirname, './build'));
 app.use(express.static(buildPath));
 const rootRouter = express.Router();

 rootRouter.get('(/*)?', async (req, res, next) => {
     res.sendFile(path.join(buildPath, 'index.html'));
   });
 app.use(rootRouter);

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

//db.sequelize.sync().then(() => {
//  app.listen(port, () => {
//      console.log("Server running on port 3001");
//  }); //function that starts whenever the server starts
//});

db.sequelize.sync()
    .then(() => {
        console.log('Database synchronized successfully');
        app.listen(port, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });
