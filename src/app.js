import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
dotenv.config();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Running server on port ${port}`));