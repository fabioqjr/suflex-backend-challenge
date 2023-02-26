import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ChallengeService } from './challenge.service';

@Controller()
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadCsv(@UploadedFile() csv: Express.Multer.File) {
    return this.challengeService.convertCsv(csv);
  }

  @Get('all')
  listAll() {
    return this.challengeService.listAll();
  }

  @Get('expire-today')
  expireToday() {
    return this.challengeService.expireToday();
  }

  @Get('expire-tomorrow')
  expireTomorrow() {
    return this.challengeService.expireTomorrow();
  }
}
