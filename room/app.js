const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Server aktif');
});

server.listen(3000);

const io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
  console.log('Kullanıcı bağlandı. ID:' + socket.id);

  socket.on('joinRoom', (data) => {
    socket.join('Room1');
    socket.join('Room2');
    socket.join('Room3');
    socket.join(data.name, () => {
      console.log(Object.keys(socket.rooms));
      // socket.to(data.name).emit('new join');
      // let count = io.sockets.adapter.rooms[data.name].length;
      io.to(data.name).emit('new join', { count: getOnlineCount(io, data) });
      socket.emit('log', { message: 'Odaya giriş yapıldı' });
    });
  });

  socket.on('leaveRoom', (data) => {
    socket.leave(data.name, () => {
      io.to(data.name).emit('leaveRoom', { count: getOnlineCount(io, data) });
      socket.emit('socket.leaved', { message: 'Odadan ayrıldınız' });
      console.log(Object.keys(socket.rooms));
    });
  });

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı');
  });
});

const getOnlineCount = (io, data) => {
  const room = io.sockets.adapter.rooms[data.name];
  return room ? room.length : 0;
};