import  express  from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db";
import AuthRouter from "./routes/auth.router";
import DepositRouter from "./routes/deposit.routes";
import GetBalanceRouter  from "./routes/getbalance.router";
import withdrawallRouter from "./routes/withdrawal.router";
import userProfileRouter from "./routes/userProfile.router";
const app = express();
const cors = require('cors');
    const corsOptions = {
        origin : "https://banking-apps.vercel.app",
        //   origin : "http://localhost:5173",
        methods:  ['GET' , 'DELETE' , 'PUT' , 'POST'],
        credentials: true
    }
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
connectDB();



app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth" , AuthRouter)
app.use("/", DepositRouter)
app.use("/" , withdrawallRouter)
app.use("/" , GetBalanceRouter)
app.use("/" , userProfileRouter)

const PORT = 3131;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});