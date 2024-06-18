const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./Routes/User');
const adminRoutes = require('./Routes/Admin');
const connectMongo = require('./config/mongodb');
const path  = require('path')
connectMongo();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(
    cors({
        origin: ['http://localhost:5173'],
        methods: ['GET','POST'],
        credentials:true 
    })
)
app.use(express.static(path.join(__dirname, "uploads")));

app.use('/',userRoutes);
app.use('/admin',adminRoutes);

const port = process.env.PORT || 4000

app.listen(port, () => { console.log(`server is running on port ${port}`) });


