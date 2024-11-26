import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./routes/users.js";
import auth from "./routes/auth.js";
dotenv.config();

const port = process.env.PORT || 8000;
const api_url = process.env.API_URL;
const mongodb_url = process.env.MONGODB_URL;

const app = express();
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// mongodb+srv://admin:admin123@cluster0.h40dz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//Connect to mongo db
mongoose.set("strictQuery", true);
mongoose.connect(mongodb_url)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("Failed to connect", error);
  });

  app.get('/', (req, res) => {
    res.send('Hello from Express server');
  });
  app.use(`${api_url}/users`, users);
  app.use(`${api_url}/auth`, auth);

