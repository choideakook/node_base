import { start } from './lib/figlet.js';
import express from 'express';
import path from 'path';

const app = express(),
    __dirname = path.resolve(),
    port = 3000;

app.set('view engine', 'pug')
app.set('views', 'my_app/views')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/my_app/public/main.html');
});

app.get('/write', (req, res) => {
    res.render('home');
});

app.get('/pug', (req, res) => {
    res.render('pug');
});

// server setting
app.listen(port, () => {
    start('EXPRESS START')
    console.log('Server is running on', port, 'port');
});