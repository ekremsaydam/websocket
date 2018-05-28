const http = require('http');
const server = http.createServer((req, res) => {
  console.log('Server aktif');
});

server.listen(3000);

const io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
  console.log('Kullanıcı bağlandı');

  socket.on('joinRoom', (data) => {
    socket.join(data.name, () => {
      // socket.to(data.name).emit('new join');
      let count = io.sockets.adapter.rooms[data.name].length;
      io.to(data.name).emit('new join', { count });
      socket.emit('log', { message: 'Odaya giriş yapıldı' });
    });
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı');
  });
});