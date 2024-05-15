import jsonServer from "json-server";
import path from "path";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.get("/", (req, res) => {
  res.sendFile(path.resolve("db.json"));
});

server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server está funcionando en el puerto ${PORT}`);
});
