import { createServer } from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises';

const __dirname = import.meta.dirname;
const port = 8080;

const server = createServer( async (req, res) => {

  let pathToResource = "";

  console.log(req.url);

  if(req.url === "/") {
    pathToResource =  path.join(__dirname, "index.html");
  } else if(req.url === "/about") {
    pathToResource = path.join(__dirname, "about.html");
  } else if(req.url === "/contact-me") {
    pathToResource = path.join(__dirname, "contact-me.html");
  } else {
    pathToResource = path.join(__dirname, "404.html");
  }

  const content = await fs.readFile(pathToResource);
  res.statusCode = pathToResource.substring(-9) === "404.html" ? 404 : 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(content);
});

server.listen(port, () => {
  console.log(`Server running at  port ${port}`);
});