const { createServer } = require('http');
const parse = require('url').parse;
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3002', 10);
const app = next({ dev, hostname: 'localhost', port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`[Socket] Client connected: ${socket.id}`);
    
    // Join company room for secure message separation
    socket.on('join-company', (companyId) => {
      socket.join(companyId);
      console.log(`[Socket] Client ${socket.id} joined company room: ${companyId}`);
    });

    // Join superadmin room for global attendant visibility
    socket.on('join-superadmin', () => {
      socket.join('superadmin');
      console.log(`[Socket] Client ${socket.id} joined superadmin room`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket] Client disconnected: ${socket.id}`);
    });
  });

  // Attach Socket.io server to node global object to access it inside Next.js App Router route handlers
  global.io = io;

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
