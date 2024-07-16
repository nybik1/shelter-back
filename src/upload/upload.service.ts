import { Injectable } from '@nestjs/common';

import * as path from 'path';
import * as sharp from 'sharp';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  private createFolderIfNotExists(): void {
    const folder = path.join('./src/assets/petPhotos');
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  private async convertToWebp(image: Express.Multer.File): Promise<string> {
    const originalName = path.parse(image.originalname).name;
    const folder = path.join('./src/assets/petPhotos');

    const savedPath = `${folder}/${originalName}.webp`;
    await sharp(image.buffer).webp({ effort: 3 }).toFile(savedPath);
    return savedPath;
  }

  private async transform(files: Array<Express.Multer.File>): Promise<void> {
    this.createFolderIfNotExists();
    await Promise.all(
      files.map(async (img) => {
        return await this.convertToWebp(img);
      }),
    );
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    await this.transform(files);
  }
}
