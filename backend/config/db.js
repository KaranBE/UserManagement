const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://karan:2jqkgRD6vA5jYyXQ@cluster0.vys3o.mongodb.net/userManagementKaran?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    console.log(`Mongodb Connected `);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
