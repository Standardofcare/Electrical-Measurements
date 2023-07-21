const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Generate random electrical measurements for demonstration purposes
function generateRandomData() {
  return {
    voltage_ab: Math.random() * 100 + 200,
    voltage_bc: Math.random() * 100 + 200,
    voltage_ca: Math.random() * 100 + 200,
    percent_vab: Math.random(),
    percent_vbc: Math.random(),
    percentV_vca: Math.random(),
    current_a: Math.random() * 500 + 800,
    current_b: Math.random() * 500 + 800,
    current_c: Math.random() * 500 + 800,
    percent_ia: Math.random() * 5 + 2.5,
    percent_ib: Math.random() * 5 + 2.5,
    percent_ic: Math.random() * 5 + 2.5,
    total_kw: Math.random() * 20 + 5,
    total_kvar: Math.random() * 30 + 10,
    total_kva: Math.random() * 100 + 200,
    total_pf: Math.random(),
    frequency: Math.random() * 2 + 59.5,
    mwhr: Math.random() * 1000000 + 1000000,
  };
}

// Send real-time data to connected clients
function sendRealTimeData() {
  const data = generateRandomData();
  io.emit('realtimeData', data);
}

io.on('connection', (socket) => {
  console.log('A client connected');

  // Send initial data when a client connects
  const data = generateRandomData();
  socket.emit('realtimeData', data);

  // Send real-time data every 2 seconds
  const interval = setInterval(() => {
    sendRealTimeData();
  }, 2000);

  socket.on('disconnect', () => {
    console.log('A client disconnected');
    clearInterval(interval);
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
