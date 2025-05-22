const http = require('http');
const app = require('./app');
const db = require('./db/index');
const WebSocketService = require('./services/websocket_service');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app); // HTTP server'ı oluşturduk

let wsService; // dışarıdan erişmek için değişken

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection successful');

    await db.sequelize.sync({ alter: true, force: true });
    console.log('Tables synchronized');

    wsService = new WebSocketService(server);
    console.log('WebSocket server started');

    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    // Export for access in routes
    module.exports.wsService = wsService;

  } catch (err) {
    console.error('Error starting server:', err);
  }
}

startServer();
