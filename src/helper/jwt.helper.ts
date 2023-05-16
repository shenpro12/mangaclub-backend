const jwt = require('jsonwebtoken');

export const generateToken = (
  user,
  secretSignature,
  tokenLife,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Định nghĩa những thông tin của user lưu vào token
    const userData = {
      id: user.id,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    // Ký và tạo token
    jwt.sign(
      { data: userData },
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      },
    );
  });
};

export const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};
