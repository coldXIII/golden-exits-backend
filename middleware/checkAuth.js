import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: error.message,
      });
    }
  } else {
    return res.status(403).json({
      message: 'You`re not Authorized',
    });
  }
};
