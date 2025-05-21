const jwt = require('jsonwebtoken');
const { User } = require('../db/index');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      // Kullanıcı bulunamazsa genel yetkisiz mesajı dön
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (user.jwtTokenVersion !== decoded.jwtTokenVersion) {
      // Token geçersiz (logout sonrası gibi durumlar)
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Eğer refresh token kullanıyorsan, refresh token'da da jwtTokenVersion kontrolü yapılmalı
    // Bu middleware sadece access token kontrolü için.

    req.user = user;
    next();

  } catch (err) {
    // Token geçersiz veya süresi dolmuşsa
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
