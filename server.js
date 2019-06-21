'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const port = process.env.PORT || 8080;

const app = express();
app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', require('./app/routes/auth.route.js'));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
