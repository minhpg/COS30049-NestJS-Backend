import { Module } from '@nestjs/common';
import { MediaUploadService } from './media-upload.service';
import { MediaUploadController } from './media-upload.controller';

@Module({
  controllers: [MediaUploadController],
  providers: [MediaUploadService],
})
export class MediaUploadModule {}
