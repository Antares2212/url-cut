import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './modules/url.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/url-cut'), UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
