import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; //환경변수
import { prisma } from '../utils/prisma/index.js';

dotenv.config({ path: '../.env' });

export default async function (req, res, next) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization)
      throw new Error('요청한 사용자의 토큰이 존재하지 않습니다.');

    // 토큰타입에 Bearer할당 , 토큰에 jwt토큰을 split를 사용해 배열 구조분해 할당
    const [tokenType, token] = authorization.split(' ');
    if (tokenType !== 'Bearer')
      throw new Error('토큰 타입이 Bearer 형식이 아닙니다.');

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    const user = await prisma.users.findFirst({
      where: { userId: +userId },
    });
    if (!user) throw new Error('토큰 사용자가 존재하지 않습니다.');

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
