import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlController } from 'src/controllers/url.controller';
import { Url, UrlSchema } from 'src/schemas/url.schema';
import { UrlService } from 'src/services/url.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Url.name, schema: UrlSchema }
  ])],
  controllers: [UrlController],
  providers: [UrlService],
}) 
export class UrlModule {}
