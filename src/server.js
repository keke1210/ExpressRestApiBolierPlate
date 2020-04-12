const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const config = require('./config/config.js');
const connectDB = require('./config/db');

connectDB();

const transactions = require('./routes/transactions');
const auth = require('./routes/auth');

const app = express();

app.use(express.json());

app.use('/api/v1/transactions', transactions);
app.use('/api/v1/auth', auth);

app.listen(config.PORT, () => {
    console.log(`Server running in ${config.ENV} mode on port ${config.PORT}`.yellow.bold);
});