import express from 'express';
import { prisma } from '../utils/prisma/index.js'; //프리즈마
import authMiddleware from '../middlewares/auth-middleware.js'; //인증미들웨어

const router = express.Router();

/********************* 캐릭터 생성 API → (JWT 인증 필요) ***********************/
router.post('/character/auth/new', authMiddleware, async (req, res, next) => {
  const { name } = req.body;
  const { userId } = req.user;

  const isExistName = await prisma.characters.findFirst({
    where: { name },
  });

  //중복된 캐릭터 이름생성을 방지
  if (isExistName) {
    return res.status(409).json({ message: '중복된 캐릭터 이름' });
  }

  const character = await prisma.characters.create({
    data: {
      userId: +userId,
      name: name,
    },
  });

  return res.status(201).json({ data: character });
});

/********************* 캐릭터 목록 조회 ***********************/
router.get('/character/list', async (req, res, next) => {
  const characterList = await prisma.characters.findMany({
    select: {
      characterId: true,
      userId: true,
      name: true,
      health: true,
      power: true,
      money: true,
    },
    orderBy: {
      characterId: 'desc',
    },
  });

  return res.status(200).json({ data: characterList });
});

/********************* 캐릭터 상세 조회 API → (JWT 인증 선택) ***********************/
router.get('/character/:characterId', async (req, res, next) => {
  const { characterId } = req.params;
  const authorization = req.headers['authorization'];

  const character = await prisma.characters.findFirst({
    where: { characterId: +characterId },
    select: {
      characterId: true,
      name: true,
      health: true,
      power: true,
    },
  });

  const authCharacter = await prisma.characters.findFirst({
    where: { characterId: +characterId },
    select: {
      characterId: true,
      name: true,
      health: true,
      power: true,
      money: true,
    },
  });

  // 로그인을 하지않았을 경우와 auth헤더에 쿠기정보가 있을때 조회 결과를 다르게함
  if (!authorization) {
    return res.status(200).json({ data: character });
  } else {
    return res.status(200).json({ data: authCharacter });
  }
});

/********************* 캐릭터 삭제 API → (JWT 인증 필요) ***********************/
router.delete('/character/delete/auth/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const authorization = req.headers['authorization'];
    const character = await prisma.characters.findFirst({
      where: { characterId: +id },
    });

    try {
      // 캐릭터 삭제
      const deletedCharacter = await prisma.characters.delete({
        where: { characterId: +id },
      });

      if (authorization) {
        return res
          .status(200)
          .json({ message: '캐릭터가 삭제되었습니다.', deletedCharacter });
      }
        
    } catch (error) {
      if (!character)
        return res.status(404).json({ message: '삭제 할 캐릭터가 없습니다' });
      console.error('Error deleting character:', error);
      return res.status(500).json({ message: '캐릭터 삭제 중 에러 발생' });
    }
  },
);

export default router;
