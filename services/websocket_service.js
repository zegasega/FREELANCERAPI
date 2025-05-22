const WebSocket = require('ws');
const url = require('url');

class WebSocketService {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.wsClientMap = new Map(); // userId => ws bağlantısı

    this.wss.on('connection', (ws, req) => {
      // Bağlantı açılırken userId parametresi bekliyoruz
      const parameters = url.parse(req.url, true);
      const userId = parameters.query.userId;

      if (!userId) {
        ws.close(1008, 'UserId is required as query parameter');
        return;
      }

      console.log(`User connected: ${userId}`);

      // Bağlantıyı kullanıcıya kaydet
      this.wsClientMap.set(userId, ws);

      ws.on('close', () => {
        console.log(`User disconnected: ${userId}`);
        this.wsClientMap.delete(userId);
      });

      ws.on('error', () => {
        this.wsClientMap.delete(userId);
      });

      ws.on('message', (message) => {
        console.log(`Message from ${userId}: ${message}`);
        // İstersen burada client mesajlarını da işleyebilirsin
      });
    });
  }

  broadcastToUser(userId, data) {
    const ws = this.wsClientMap.get(userId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    } else {
      console.log(`User ${userId} is not connected.`);
    }
  }

  broadcastAll(data) {
    const message = JSON.stringify(data);
    for (const ws of this.wsClientMap.values()) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    }
  }
}

module.exports = WebSocketService;
