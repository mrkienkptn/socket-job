const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    credentials: true
  }
})
io.of('/admin').on('connection', socket => {
  console.log(socket.id)
})
io.on('connection', socket => {
  socket.on('join-groups', data => {
    socket.join(data.groupIds)
  })
  socket.on('send-msg', data => {
    socket.to(data.group).emit('receive-msg', data.payload)
  })
  socket.on('disconnect', () => {
    console.log('Disconnect')
  })
})

httpServer.listen(8080)
