import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./db/connect";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import route from "./routes/route";
const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/api/v1", route());

const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
