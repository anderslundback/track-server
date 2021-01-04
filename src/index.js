const express = require('express');
const mongoose = require('mongoose');

const app = express();

const mongoUri = 'mongodb+srv://admin:korpral13@cluster0.zbalx.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to monto', err);
});

app.get('/', (req, res) => {
    res.send('Hi there');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});