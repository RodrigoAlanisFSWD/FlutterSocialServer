import express, { Express } from 'express';
import morgan from 'morgan';

const app: Express = express();

// middlewares
app.use(morgan('dev'));

// configuration
app.set('port', process.env.PORT || 8080);

// routers
app.get('/', (req, res) => {
    return res.send("Hello World");
})

export default app;