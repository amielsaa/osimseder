const express = require('express');
const app = express();
const port = 3001;

const cors = require("cors")
app.use(express.json())
app.use(cors())
//const db = require()

const helloRouter = require("./routes/Hello")
app.use("/", helloRouter)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});