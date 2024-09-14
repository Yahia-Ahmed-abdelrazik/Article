//importing express || basic configration
const express = require("express");
const app = express();
//db connection
const dbConnection = require("./database/dbConnection");
//config
require("dotenv").config({ path: "./config/config.env" });
//articleRoutes
const articleRoutes = require("./routes/articleRoutes");
/////
app.use(express.json());
app.use("/api/articles", articleRoutes);

dbConnection();
//listening to port
app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
