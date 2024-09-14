const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "otakayahiaarticle",
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

// export
module.exports = dbConnection;
