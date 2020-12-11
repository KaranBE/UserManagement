const path = require("path");
const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
const morgan = require("morgan");

// File uploading
app.use(fileupload());

const cookieParser = require("cookie-parser");

app.use(express.static(path.join(__dirname, "public")));

//getting mongodb connection
const connectDB = require("./config/db");
//getting route files

const auth = require("./routes/auth");
const uploads = require("./routes/uploads");

//error handler middleware
//if i have to use it i have to set it after the routes ok.
const errorHandler = require("./middleware/error");

const cors = require("cors");

//using body parser
app.use(express.json());
app.use(cors());

//cookie parser
app.use(cookieParser());
//connecting to db
connectDB();
const PORT = process.env.PORT || 5000;
app.use(morgan("dev"));
//use file upload

//setting static folder

//Mount Routres

app.use("/api/v1/auth", auth);
app.use("/api/v1/uploads", uploads);

app.use(errorHandler);

const serverRun = app.listen(PORT, () => {
  console.log(`server running in on port ${PORT}`);
});
//handling unhandled promise rejection rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //closing the server & exit process
  //passing 1 mean we r closing it with some error
  serverRun.close(() => process.exit(1));
});
