import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { requestWithFile, mapBizLicenseToSimpleFormat } from '../services/ocrService.mjs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const format = file.mimetype.split('/')[1];
    const name = file.originalname;
    const userId = req.body.userId;


    const fileStream = fs.createReadStream(file.path);
    const response = await requestWithFile(fileStream, format, name, userId);

    if (response.status === 200) {
      const parsed = mapBizLicenseToSimpleFormat(response.data);
      console.log(parsed)
      res.json(parsed);
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (e) {
    res.status(500).json({
      error: 'OCR 처리 실패',
      detail: e.response ? e.response.data : e.message
    });
  }
});

export default router;
