const http = require('http');
const { Worker } = require('worker_threads');
const url = require('url');

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped ${code}`));
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const number = parseInt(queryObject.number);

  if (!number) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Provide a valid number as a query parameter');
    return;
  }

  try {
    const result = await runWorker(number);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Fibonacci(${number}) = ${result}`);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Error: ${error.message}`);
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
