const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/squares - confirmed 상태 칸만 반환
const getSquares = async (req, res) => {
  try {
    const squares = await prisma.square.findMany({
      where: { status: 'confirmed' },
    });

    // API 문서 형식에 맞게 { dongCode: data } 형태로 변환
    const result = {};
    squares.forEach(square => {
      result[square.dongCode] = square;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

// POST /api/squares - 동 칸 신청
const createSquare = async (req, res) => {
  try {
    const {
      dongCode, name, isPremium, ownerName,
      description, message, link, imageUrl, depositorName
    } = req.body;

    // 필수값 체크
    if (!dongCode || !name || !ownerName || !description || !depositorName) {
      return res.status(400).json({ success: false, message: '필수 필드 누락' });
    }

    // 이미 confirmed 상태인 동이 있으면 거절
    const existing = await prisma.square.findFirst({
      where: { dongCode, status: 'confirmed' },
    });
    if (existing) {
      return res.status(409).json({ success: false, message: '이미 점령된 칸입니다' });
    }

    const square = await prisma.square.create({
      data: {
        dongCode, name, isPremium: isPremium || false,
        ownerName, description,
        message: message || null,
        link: link || null,
        imageUrl: imageUrl || null,
        depositorName,
        status: 'pending',
      },
    });

    res.json({ success: true, squareId: square.id });
  } catch (error) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

module.exports = { getSquares, createSquare };