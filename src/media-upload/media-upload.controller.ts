import { Body, Controller, Post } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
import { MediaUploadService } from './media-upload.service';

@Controller('media-upload')
export class MediaUploadController {
  constructor(private mediaUploadService: MediaUploadService) {}

  @Post('create-multipart')
  async createMultiPart(@Body() body: any) {
    return await this.mediaUploadService.createMultipartUpload(body);
  }

  @Post('upload-part')
  async uploadPart(@Body() body: any) {
    return await this.mediaUploadService.uploadPart(body);
  }

  @Post('complete-multipart')
  async completeMultiPart(@Body() body: any) {
    return await this.mediaUploadService.completeMultiPart(body);
  }

  @Post('get-presigned-url')
  async getPresignedUrl(@Body() body: any) {
    return await this.mediaUploadService.getPreSignedUrl(body);
  }

  @Post('abort-multipart')
  async abortMultiPart(@Body() body: any) {
    return await this.mediaUploadService.abortMultiPart(body);
  }
}
