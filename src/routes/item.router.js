import express from 'express';
import { prisma } from '../utils/prisma/index.js'; //프리즈마
import authMiddleware from '../middlewares/auth-middleware.js'; //인증미들웨어

const router = express.Router();

/********************* 아이템 생성 API ***********************/
router.post('/item/create', async (req, res, enxt) => {
  const { itemName, itemStat, itemPrice } = req.body;

  const isExistItemName = await prisma.items.findFirst({
    where: { itemName },
  });

  //중복된 아이템 생성을 방지
  if (isExistItemName) {
    return res.status(409).json({ message: '중복된 아이템명' });
  }

  const item = await prisma.items.create({
    data: {
      itemName: itemName,
      itemStat: itemStat,
      itemPrice: itemPrice,
    },
  });

  return res.status(201).json({ item });
});

/********************* 아이템 수정 API ***********************/
router.put('/item/edit/:itemId', async (req, res, next) => {
  const { itemId } = req.params;
  const { itemName, itemStat } = req.body;

  const isExistItem = await prisma.items.findUnique({
    where: { itemId: parseInt(itemId) },
  });

  if (!isExistItem) {
    return res.status(409).json({ message: '아이템이 존재하지 않음' });
  }

  const updatedItem = await prisma.items.update({
    where: { itemId: +itemId },
    data: {
      itemName: itemName || isExistItem.itemName, // 기존 값 유지 또는 새 값으로 업데이트
      itemStat: itemStat || isExistItem.itemStat,
    },
  });

  return res.status(201).json({ updatedItem });
});

/********************* 아이템 목록 조회 ***********************/
router.get('/item/list', async (req, res, next) => {
  const itemList = await prisma.items.findMany({
    select: {
      itemId: true,
      itemName: true,
      itemStat: true,
      itemPrice: true,
    },
    orderBy: {
      itemId: 'desc',
    },
  });

  return res.status(200).json({ data: itemList });
});

/********************* 아이템 상세 조회 API ***********************/
router.get('/item/detail/:itemId', async (req, res, next) => {
  const { itemId } = req.params;

  const item = await prisma.items.findFirst({
    where: { itemId: +itemId },
    select: {
      itemId: true,
      itemName: true,
      itemStat: true,
      itemPrice: true,
    },
  });

  //조회하는 아이템이 db에 존재하지 않을경우
  if (!item)
    return res.status(404).json({ message: '아이템이 존재하지 않습니다' });

  return res.status(200).json({ data: item });
});

/********************* 캐릭터 삭제 API → (JWT 인증 필요) ***********************/
router.delete('/item/delete/auth/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const authorization = req.headers['authorization'];
  const item = await prisma.items.findFirst({
    where: { itemId: +id },
  });

  try {
    // 캐릭터 삭제
    const deletedItem = await prisma.items.delete({
      where: { itemId: +id },
    });

    if (authorization) {
      return res
        .status(200)
        .json({ message: '아이템이 삭제되었습니다.', deletedItem });
    }
      
  } catch (error) {
    if (!item)
      return res.status(404).json({ message: '삭제 할 아이템이 없습니다' });
    console.error('Error deleting character:', error);
    return res.status(500).json({ message: '아이템 삭제 중 에러 발생' });
  }
},
);

export default router;
