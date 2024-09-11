import express from 'express';
import bcrypt from 'bcrypt'; //비트립트해시
import dotenv from 'dotenv'; //환경변수
import jwt from 'jsonwebtoken'; //JWT
import { prisma } from '../utils/prisma/index.js'; //프리즈마

dotenv.config({ path: '../.env' });

const router = express.Router();

/********************* 회원가입API ***********************/
router.post('/users/signup', async (req, res, next) => {
  let hashUserPassword = await bcrypt.hash(req.body.password, 10);
  const { email } = req.body;
  const password = hashUserPassword;

  const isExistUser = await prisma.users.findFirst({
    where: { email },
  });

  if (isExistUser) {
    return res
      .status(409)
      .json({ message: '이미 존재하는 이메일 또는 비밀번호' });
  }

  const user = await prisma.Users.create({
    data: { email, password },
  });

  return res.status(201).json({ message: '회원가입 완료' });
});

/********************* 로그인API ***********************/
router.post('/users/auth/signin', async (req, res, next) => {
  //로그인정보가 db의 정보가 일치하는지 비교
  const { email, password } = req.body;

  const user = await prisma.users.findFirst({ where: { email } });

  if (!user) return res.status(404).json({ message: '존재하지 않는 이메일' });
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(404).json({ message: '비밀번호가 일치하지 않음.' });

  const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY);

  res.cookie('authorization', `Bearer ${token}`);
  return res.status(200).json({ message: '로그인 완료' });
});

export default router;
