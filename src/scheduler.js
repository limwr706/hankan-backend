const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const startScheduler = () => {
  // 매일 자정(00:00)에 실행
  cron.schedule('0 0 * * *', async () => {
    console.log('⏰ 만료 체크 시작...');

    try {
      const result = await prisma.square.updateMany({
        where: {
          status: 'confirmed',
          expiresAt: { lte: new Date() }, // 만료일이 지난 것
        },
        data: { status: 'expired' },
      });

      console.log(`✅ 만료 처리 완료: ${result.count}개`);
    } catch (error) {
      console.error('❌ 만료 처리 실패:', error);
    }
  });

  console.log('📅 스케줄러 시작됨');
};

module.exports = startScheduler;