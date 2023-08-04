const mongoose = require("mongoose");

//conntect database
const connectDataBase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`MongoDB is connected with ${data.connection.host}`);
  });
};

module.exports = connectDataBase;
