import dotenv from 'dotenv';
dotenv.config();

const jwtConfig = {
  secretKey: process.env.JWT_KEY,
  expiresIn: process.env.EXPIRES_IN
}

export { jwtConfig };
