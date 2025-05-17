import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const OCR_SECRET = process.env.OCR_SECRET;
const OCR_API_URL = process.env.OCR_API_URL;


export function requestWithFile(fileStream, format, name, userId) {
  const message = {
    images: [{ format, name }],
    requestId: userId,
    timestamp: Date.now(),
    version: 'V2'
  };

  const formData = new FormData();
  formData.append('file', fileStream);
  formData.append('message', JSON.stringify(message));

  return axios.post(
    OCR_API_URL,
    formData,
    {
      headers: {
        'X-OCR-SECRET': OCR_SECRET,
        ...formData.getHeaders()
      }
    }
  );
}

export function mapBizLicenseToSimpleFormat(data) {
  const result = data?.images?.[0]?.bizLicense?.result || {};
  const getText = field => result?.[field]?.[0]?.text?.trim() || '';

  return {
    corpName: getText('companyName') || getText('corpName'),
    representative: getText('repName'),
    licenseNum: getText('registerNumber'),
    businessType: getText('bisType'),
    businessItem: getText('bisItem'),
    address: getText('bisAddress') || getText('bisArea') || getText('headAddress')
  };
}
