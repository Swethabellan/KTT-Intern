const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hi SwethaBellan\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

const http = require('http');
// const fs = require('fs');

// const server1 = http.createServer((req, res) => {
//   if (req.url === '/file' && req.method === 'GET') {
//     fs.readFile('example.txt', 'utf8', (err, data) => {
//       if (err) {
//         res.statusCode = 500;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Error reading file\n');
//         return;
//       }
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/plain');
//       res.end(data);
//     });
//   } else {
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('404: Not Found\n');
//   }
// });

// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000/');
// });