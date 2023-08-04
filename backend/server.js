const app = require("./app");
const connectDataBase = require("./config/dataBase");

//handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down the Server due to uncaught Exception");
  process.exit(1);
});

//config
require("dotenv").config({ path: "backend/config/.env" });

//connecting to database
connectDataBase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//unHandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down the Server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
