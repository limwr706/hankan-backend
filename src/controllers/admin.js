const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/admin/squares - 전체 목록 (pending 포함)
const getAllSquares = async (req, res) => {
  try {
    const squares = await prisma.square.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(squares);
  } catch (error) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

// PATCH /api/admin/squares/:id/confirm - 승인
const confirmSquare = async (req, res) => {
  try {
    const { id } = req.params;
    const { days } = req.body; // 며칠짜리로 승인할지

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (days || 30)); // 기본 30일

    const square = await prisma.square.update({
      where: { id },
      data: { status: 'confirmed', expiresAt },
    });

    res.json({ success: true, square });
  } catch (error) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

// DELETE /api/admin/squares/:id - 삭제
const deleteSquare = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.square.delete({ where: { id } });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

// GET /api/admin/expired - 만료된 목록
const getExpiredSquares = async (req, res) => {
  try {
    const squares = await prisma.square.findMany({
      where: { status: 'expired' },
      orderBy: { createdAt: 'desc' },
    });
    res.json(squares);
  } catch (error) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

// GET /api/admin/stats - 통계
const getStats = async (req, res) => {
  try {
    const total = await prisma.square.count();
    const confirmed = await prisma.square.count({ where: { status: 'confirmed' } });
    const pending = await prisma.square.count({ where: { status: 'pending' } });
    const expired = await prisma.square.count({ where: { status: 'expired' } });
    res.json({ total, confirmed, pending, expired });
  } catch (error) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

// GET /api/admin/pending - 대기 중인 것만
const getPendingSquares = async (req, res) => {
  try {
    const squares = await prisma.square.findMany({
      where: { status: 'pending' },
      orderBy: { createdAt: 'desc' },
    });
    res.json(squares);
  } catch (error) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
};

module.exports = { getAllSquares, confirmSquare, deleteSquare, getExpiredSquares, getStats };