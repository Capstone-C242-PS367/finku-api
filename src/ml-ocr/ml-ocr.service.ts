import { Injectable } from '@nestjs/common';

@Injectable()
export class MlOcrService {
  uploadFile(file: Express.Multer.File) {
    console.log(file);

    //TODO: INI NANTI DIHAPUS DIGANTI SAMA HASIL OCR BENERAN
    //dummy doang buat ngetes di md
    const result = [];
    const name = [
      'ayam geprek',
      'nasi goreng',
      'mie ayam',
      'jus jeruk',
      'roti bakar',
    ];
    const category = ['Makan', 'Belanja', 'Parkir', 'Listrik', 'Laundry'];
    const type = ['CR', 'DB'];
    for (let i = 0; i <= Math.floor(Math.random() * 7) + 1; i++) {
      result.push({
        amount: Math.floor(Math.random() * 100000),
        type: type[i % 2],
        category: category[Math.floor(Math.random() * 5)],
        name: name[Math.floor(Math.random() * 5)],
        currency: 'IDR',
        date: new Date().toISOString(),
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let totalDB = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let totalCR = 0;

    result.forEach((res) => {
      if (res.type === 'CR') {
        totalCR += res.amount;
      } else {
        totalDB += res.amount;
      }
    });

    ////////////////////////////////////////

    return {
      status: 'success',
      message: 'Berhasil melakukan ocr',
      data: {
        total_DB: totalDB,
        total_CR: totalCR,
        difference: totalDB - totalCR,
        result: result,
      },
    };
  }
}
