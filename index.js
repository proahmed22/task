import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import { bootstrap } from "./src/index.router.js";
import cors from 'cors'
import cron from 'node-cron';
import { refreshPropertyRequests } from "./src/modules/requests/controller/requests.js";
//set the path of .env file
dotenv.config()
//init port
const PORT = process.env.PORT || 3000

//initialize express app 
const app = express();

//set up cors middleware
app.use(cors())

//for parsing application/json
app.use(express.json());

dbConnection();
bootstrap(app);

// Cron job  every 3 days at 00:00
cron.schedule('0 0 */3 * *', refreshPropertyRequests);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))