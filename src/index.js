const express = require('express');
const cors = require('cors');
require('dotenv').config();
const startScheduler = require('./scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors({
  origin: 'https://hankan-seoul-frontend.vercel.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
app.use(express.json());

// 라우터 연결
app.use('/api/squares', require('./routes/squares'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/upload', require('./routes/upload'));

// 서버 동작 확인용
app.get('/', (req, res) => {
  res.json({ message: '한칸대한민국 백엔드 서버 🇰🇷' });
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
  startScheduler();
});