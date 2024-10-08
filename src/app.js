import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { engine } from 'express-handlebars';
import mongoose from './config/database.js';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/api/sessions.js';
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/order.routes.js'
import viewsRouter from './routes/views.js';
import cartRouter from './routes/cart.routes.js';
import adminRouter from './routes/admin.routes.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars'


// Obtener __filename a partir de import.meta.url
const __filename = fileURLToPath(import.meta.url);

// Obtener __dirname a partir de __filename
const __dirname = path.dirname(__filename);

console.log("dir", __dirname)


const app = express();

const PORT = 8080



console.log(path.join((__dirname, "public")))
//app.engine('handlebars', hbs.engine);
app.engine('hbs', engine({
    extname: '.hbs', // Extensión de archivos
    defaultLayout: 'main', // Layout por defecto
    helpers: {
        eq: (a, b) => a === b, // Helper 'eq' para comparar valores
    }
}));


app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://Dario:XQr2vgqNA7zcJgQJ@cluster0.pmc2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' })
}));
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);
app.use("/", productRouter)
app.use("/", cartRouter)
app.use("/", orderRouter)
app.use("/", adminRouter)

app.use(express.static(__dirname + '/public'))




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
