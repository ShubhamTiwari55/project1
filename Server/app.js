const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
const app = express();
const PORT = 4000;

connectDB();
app.use(express.json());

app.use('/api/auth', require('./Auth/auth.routes'));
app.use('/api/req', require('./Req&Res/route'));
app.use('/api/pref', require('./Preference/routes'));


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);