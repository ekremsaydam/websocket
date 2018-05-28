const http = require('http');
const server = http.createServer((req, res) => {
  console.log('Server calisiyor.');
});

server.listen(3000);

const io = require('socket.io').listen(server);
const nsp = io.of('/mynamespace');

nsp.on('connection', (socket) => {
  console.log('Kullanıcı bağlandı.');

  socket.on('gonder', () => {
    console.log('Butona t gonderi algılandı');
    nsp.emit('gonder', { name: 'Mehmet' });
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı');
  });
});