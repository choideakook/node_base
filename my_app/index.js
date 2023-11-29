import {routes} from './routes/route.js';
import {start} from './lib/figlet.js';
import express from 'express';
import bodyParser from 'body-parser';

const app = express(),
    port = 3000;

//-- view setting --//
app.set('view engine', 'pug')
app.set('views', 'my_app/views')

//-- application setting --//
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    start('EXPRESS START')
    console.log('Server is running on', port, 'port');
});