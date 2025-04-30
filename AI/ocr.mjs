import express from 'express'
import multer from 'multer'
import FormData from 'form-data'
import axios from 'axios'
import fs from 'fs'

const app = express()
const upload = multer({ dest: 'uploads/' })

const OCR_SECRET = 'VUtEVGFac0Z3c2tDTkxJQ3B3YkF1WGdoeXhvVFlqVUI=' // X-OCR-SECRET
const OCR_API_URL = 'https://v0j243wim9.apigw.ntruss.com/custom/v1/41532/54958f9b0a365b528cfbfc6138d03e0874a4f7ea5829a38cc92ebe9605fb80a8/document/biz-license' // OCR API Gateway URL

function requestWithFile(fileStream, format, name) {
  const message = {
    images: [
      {
        format: format, // file format (e.g., 'png', 'jpg')
        name: name // file name
      }
    ],
    requestId: Date.now().toString(), // unique string
    timestamp: Date.now(), // current timestamp
    version: 'V2' // fixed version
  }

  const formData = new FormData()
  formData.append('file', fileStream)
  formData.append('message', JSON.stringify(message))

  return axios.post(
    OCR_API_URL, // APIGW Invoke URL
    formData,
    {
      headers: {
        'X-OCR-SECRET': OCR_SECRET, // Secret Key
        ...formData.getHeaders()
      }
    }
  )
}


function mapBizLicenseToSimpleFormat(data) {
  const result = data?.images?.[0]?.bizLicense?.result;

  const getText = (field) =>
    result?.[field]?.[0]?.text?.trim() || '';

  const 거래처명 = getText('companyName') || getText('corpName');
  const 대표자명 = getText('repName');
  const 사업자번호 = getText('registerNumber');
  const 업태 = getText('bisType');
  const 종목 = getText('bisItem');
  const 주소 = getText('bisAddress') || getText('bisArea') || getText('headAddress');


  return {
    거래처명,
    대표자명,
    "사업자 번호": 사업자번호,
    업태,
    종목,
    주소
  };
}

app.post('/ocr', upload.single('file'), async (req, res) => {
  try {
    const file = req.file
    const format = file.mimetype.split('/')[1]
    const name = file.originalname
    const fileStream = fs.createReadStream(file.path)

    const response = await requestWithFile(fileStream, format, name)
    
    // Clean up
    fs.unlinkSync(file.path)

    if (response.status === 200) {
      console.log('requestWithFile response:', response.data)
  
      const parsed = mapBizLicenseToSimpleFormat(response.data);
      res.json(parsed);
    } else {
      throw new Error(`Unexpected status code: ${response.status}`)
    }
  } catch (e) {
    console.warn('requestWithFile error', e.response ? e.response.data : e.message)
    res.status(500).json({
      error: 'OCR processing failed',
      detail: e.response ? e.response.data : e.message
    })
  }
})

app.listen(3000, () => {
  console.log('✅ OCR proxy server running on http://localhost:3000')
})