import { Controller, Get, Param, Res } from '@nestjs/common';
import { join } from 'path';

@Controller('')
export class FileController {
  @Get('petPhotos/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: any) {
    res.sendFile(filename, {
      root: join(process.cwd(), 'src/assets/petPhotos'),
    });
  }
}
