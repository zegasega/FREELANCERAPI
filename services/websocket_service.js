const WebSocket = require('ws');

class WebSocketService {
    constructor(server) {
        this.wss = new WebSocket.Server({ server });
        this.clients = new Set();
        this.initialize();
    }

    initialize() {
        this.wss.on('connection', (ws) => {
            console.log('New client connected');
            this.clients.add(ws);

            ws.on('message', (message) => {
                this.handleMessage(ws, message);
            });

            ws.on('close', () => {
                console.log('Client disconnected');
                this.clients.delete(ws);
            });

            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
                this.clients.delete(ws);
            });
        });
    }

    handleMessage(ws, message) {
        try {
            const parsedMessage = JSON.parse(message);
            console.log('Received message:', parsedMessage);

            // Handle different message types here
            switch (parsedMessage.type) {
                case 'message':
                    this.broadcast(parsedMessage);
                    break;
                default:
                    console.log('Unknown message type:', parsedMessage.type);
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    }

    broadcast(message) {
        this.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }

    sendToClient(client, message) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    }
}

module.exports = WebSocketService;