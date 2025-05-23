const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const clients = new Map(); // id -> ws

wss.on('connection', function connection(ws) {
  console.log('Bir kullanıcı bağlandı.');
  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(message);

      if (data.type === 'register') {
        clients.set(data.id, ws);
        ws.userId = data.id;
        console.log(`Kullanıcı kaydedildi: ID = ${data.id}`);
      }

      if (data.type === 'message' && data.to) {
        const target = clients.get(data.to);
        if (target && target.readyState === WebSocket.OPEN) {
          target.send(JSON.stringify({
            from: ws.userId,
            text: data.text
          }));
        }
      }

    } catch (err) {
      console.error('Hatalı mesaj:', err);
    }
  });

  ws.on('close', () => {
    if (ws.userId) {
      clients.delete(ws.userId);
      console.log(`Kullanıcı ayrıldı: ID = ${ws.userId}`);
    }
  });

  ws.send(JSON.stringify({ type: 'info', message: 'Lütfen ID ile kaydol: { "type": "register", "id": "12" }' }));
});
