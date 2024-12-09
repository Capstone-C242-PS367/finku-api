import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class MlOcrService {
  async uploadFile(file: Express.Multer.File) {
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });

    try {
      const response = await axios.post(
        'https://finku-ml-api-996360456227.asia-southeast2.run.app/predict',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );

      const { Date: dates, Nominal: nominal, Type: types } = response.data;

      const result = [];
      let totalDB = 0;
      let totalCR = 0;

      const length = Math.min(dates.length, nominal.length, types.length);
      for (let i = 0; i < length; i++) {
        const amount = parseInt(nominal[i].replace(/[^0-9]/g, ''), 10);
        const type = types[i];
        const date = dates[i];

        result.push({
          amount: amount,
          type: type,
          category: '',
          title: '',
          currency: 'IDR',
          date: date,
        });

        if (type === 'CR') {
          totalCR += amount;
        } else {
          totalDB += amount;
        }
      }

      return {
        status: 'success',
        message: 'Berhasil melakukan ocr',
        data: {
          total_debit: totalDB,
          total_credit: totalCR,
          difference: totalDB - totalCR,
          result: result,
        },
      };
    } catch (error) {
      console.error('Error uploading file to ML API:', error);
      throw new Error('Failed to process the image with the ML API');
    }
  }
}
