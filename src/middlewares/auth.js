const adminAuth = (req, res, next) => {
    const password = req.headers['x-admin-password'];
  
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: '인증 실패' });
    }
  
    next(); // 비밀번호 맞으면 다음으로 진행
  };
  
  module.exports = adminAuth;