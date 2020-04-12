const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const config = require('./config/config.js');
const connectDB = require('./config/db');

connectDB();

const versionUrl = config.VERSION_API_URL;

const transactions = require('./routes/transactions');
const auth = require('./routes/auth');

const app = express();

app.use(express.json());

app.use(`${versionUrl}/transactions`, transactions);
app.use(`${versionUrl}/auth`, auth);

app.listen(config.PORT, () => {
    console.log(`Server running in ${config.ENV} mode on port ${config.PORT}`.yellow.bold);
});