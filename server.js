const http = require('http');
const app = require('./app');
const db = require('./db/index');
require('dotenv').config();
const WebSocketService = require('./services//websocket_service'); 

const PORT = process.env.PORT || 3000;


const server = http.createServer(app);

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection successful');

    await db.sequelize.sync({ alter: true });
    console.log('Tables synchronized');
    

    new WebSocketService(server);
    console.log('WebSocket server started');

    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
}

startServer();
