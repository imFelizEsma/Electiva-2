import express from 'express';
import morgan from 'morgan';
import {join, dirname, extname} from 'path';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import personasRoute from './routes/personas.routes.js';

//Initialization
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutDir: join(app.get('views'), 'layouts'),
    partialDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.render('index')
});

app.use(personasRoute);

//Public files
app.use(express.static(join(__dirname, 'public')));

//Run server
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});