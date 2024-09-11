import express from 'express';
import dotenv from 'dotenv'; //환경변수

import UserRouter from './routes/user.router.js';
import ItemRouter from './routes/item.router.js';
import CharacterRouter from './routes/character.router.js';

const app = express();

dotenv.config({ path: '../.env' });

app.use(express.json());
app.use('/api', [UserRouter, ItemRouter, CharacterRouter]);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT} 에서 서버 실행중`);
});
