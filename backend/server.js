//requiering express and initializing the app:
import express from "express";
//requiering the cors middleware:
import cors from "cors";
import bodyParser from "body-parser";
import Mongoose from "mongoose";
import { xss } from "express-xss-sanitizer";
import { insertData } from "./utils/assignmentsSeed.js";

const app = express();

const PORT = 8080; //we will use port 8080

import router from "./routes/api-routes.js";
import assignmentRoutes from "./routes/assignmentsController.js";

import dotenv from "dotenv";
dotenv.config();

// Connecting to mongoDB with mongoose
Mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database connected");
  }
);

insertData();
setInterval(insertData, 1000 * 60 * 60);

app.use(cors()); //telling express to use the cors middleware

app.use(xss()); //telling express to use xss sanitizer to sanitise all incoming requests

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api", router);
app.use("/api/assignments", assignmentRoutes);

app.listen(PORT, () => {
  //listen to the port we chose above
  //print to the console that the server is listening
  console.log("listening to port: " + PORT);
});
