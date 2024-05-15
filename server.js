import jsonServer from 'json-server';
import path from 'path';
// cors policy
import cors from 'cors';

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}
server.use(cors(corsOptions));
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.get('/', (req, res) => {
    res.sendFile(path.resolve('db.json'));
});

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server está funcionando en el puerto ${PORT}`);
});