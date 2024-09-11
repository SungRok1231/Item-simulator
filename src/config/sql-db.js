import mysql from 'mysql2'; //DB드라이버
import dotenv from 'dotenv'; //환경변수

dotenv.config({ path: '../.env' }); // 환경 변수 로드

export async function connectDB() {
  try {
    const db = await mysql.createConnection({
      host: process.env.RDS_HOST,      // AWS RDS 엔드포인트
      user: process.env.RDS_USER,      // AWS RDS 계정 명
      password: process.env.RDS_PASSWORD,  // AWS RDS 비밀번호
      database: process.env.RDS_DATABASE,  // MySQL DB 이름
    });

    console.log('MySQL 데이터베이스 연결 성공');
    return db;
  } catch (error) {
    console.error('데이터베이스 연결 실패:', error);
    throw error;
  }
}

//쓸일 있을 줄 알았더니 프리즈마 때문에 쓸일이 없네..




