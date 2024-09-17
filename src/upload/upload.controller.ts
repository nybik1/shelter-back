import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("upload")
export class UploadController {
  constructor(private readonly filesServies: UploadService) {}
  @UseGuards(AuthGuard)
  @Post("/petPhotos")
  @UseInterceptors(AnyFilesInterceptor())
  uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        errorHttpStatusCode: HttpStatus.PAYLOAD_TOO_LARGE,
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 })],
      }),
      new ParseFilePipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        validators: [new FileTypeValidator({ fileType: ".(png|jpeg|jpg|webp)" })],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.filesServies.uploadFiles(files);
  }
}
