const { parentPort, workerData } = require('worker_threads');

function fibonacci(n) {
  if (n < 2){
    return n;
  } 
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(workerData);
parentPort.postMessage(result);
