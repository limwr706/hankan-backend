const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Cloudinary 설정
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// multer: 파일을 메모리에 임시 저장
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
});

// POST /api/upload
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '파일 없음' });
    }

    // Buffer를 Cloudinary에 업로드
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'hankan' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    res.json({ success: true, imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: '업로드 실패' });
  }
};

module.exports = { upload, uploadImage };