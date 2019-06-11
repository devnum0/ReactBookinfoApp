const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: process.env.PWD + '/.env'})

const app = express();
const URL = process.env.REACT_APP_DATABASE_URL;
app.use(cors());
mongoose.connect(URL,{ useNewUrlParser: true });
mongoose.connection.once('open', () =>{
    console.log('connected to database')
});
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4000, () => {
console.log('now listening on port 4000');
});
