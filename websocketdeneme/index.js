const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('WebSocket bağlantısı kuruldu');
  
  // İstersen bir mesaj da gönderebilirsin
  socket.send(JSON.stringify({
    type: "message",
    content: "Merhaba sunucu!"
  }));
};

socket.onmessage = (event) => {
  console.log('Sunucudan mesaj:', event.data);
};

socket.onerror = (error) => {
  console.error('WebSocket hatası:', error);
};

socket.onclose = () => {
  console.log('WebSocket bağlantısı kapandı');
};
