import jsonServer from 'json-server';
import path from 'path';

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