// CORE MODULES
// http   : Launch a server, send requests
// https  : Launch a SSL server
// fs     : file system
// path   : path resolve
// os     : operating system

import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.headers.host);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>MY DOCUMENT</title></head>");
    res.write("<body><h1>Hello</h1></body>");
    res.write("</html>");
    return res.end();
  }

  if (req.url?.startsWith("/api")) {
    res.setHeader("Content-Type", "Application/json");
    res.write('{"name": "joe"}');
    return res.end();
  }
});

server.listen(3000);
