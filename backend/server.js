require('dotenv').config();

const express=require('express');
const connectDb=require('./config/db')
const cors=require('cors');
const app=express();

const expenseroutes=require('./routes/expenseroute');
const { default: mongoose } = require('mongoose');



app.use(cors());
app.use(express.json());


app.use('/api/expense',expenseroutes);

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log("server is running")
})
