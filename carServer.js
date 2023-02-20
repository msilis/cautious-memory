require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.port || 3001;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
mongoose.set('strictQuery', true);
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', ()=> console.log('Connected to database'))

app.use(express.json())
app.use(bodyParser.json())

const carRouter = require('./routes/cars')
app.use('/cars', carRouter)

app.listen(port, ()=> console.log(`I am listening on ${port}`))