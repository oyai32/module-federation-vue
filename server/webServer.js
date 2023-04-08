const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/getData') {
    // 返回数据
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Hello, world! 8090' }));
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8090, () => {
  console.log('Server started on port 8090');
});
