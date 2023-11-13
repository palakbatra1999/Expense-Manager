import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import transactionRoutes from './routes/transactionRoute.js'
import cors from 'cors';
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();

connectDB();
app.use(cors());


app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(bodyParser.json());
dotenv.config();


app.use('/api/v1/transaction',transactionRoutes)
app.use('/api/v1/auth',authRoutes)

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})



app.get('/',(req,res)=>{

    res.send({
        message :'Hello, from here' 
    })
}
)

const PORT = process.env.PORT;

app.listen(PORT , ()=>{
    console.log('Server running on port :', PORT)
})