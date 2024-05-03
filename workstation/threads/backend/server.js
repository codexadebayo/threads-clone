import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './db/connectDB.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB();
const app = express()


const PORT = process.env.PORT || 5000; 

app.use(express.json()); //to parse JSON data in the req.body
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.listen(PORT, ()=>{
    console.log(`Server listening on localhost/ port ${PORT}`)})



// API Routes
app.use('/api/users', userRoutes)
