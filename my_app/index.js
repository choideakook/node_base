import {routes} from './routes/route.js';
import {start} from './lib/figlet.js';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


const app = express()
const PORT = 3000;
const MONGO_URL = 'mongodb://localhost:27017';

//-- view setting --//
app.set('view engine', 'pug')
app.set('views', 'my_app/views')

//-- Database --//
mongoose.connect(MONGO_URL)
    .then(() => console.log('DB 연결 성공'))
    .catch(e => console.error(e));

const {Schema} = mongoose;
const WritingSchema = new Schema({
    title: String,
    contents: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const Writing = mongoose.model('Writing', WritingSchema);

//-- application setting --//

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    start('EXPRESS START')
    console.log('Server is running on', PORT, 'port');
});