import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from 'src/dto/create-url.dto';
import { Url, UrlDocument } from 'src/schemas/url.schema';

@Injectable()
export class UrlService {

  constructor(@InjectModel(Url.name) private UrlModule: Model<UrlDocument>) {}

  async getAll(): Promise<Url[]> {
    return this.UrlModule.find().exec()
  }

  async getOriginalUrl(shortUrl: string): Promise<Url> {
    return this.UrlModule.findOne({ shortUrl: shortUrl }).exec()
  }

  async create(urlDto: CreateUrlDto): Promise<Url> {
    let url: null = await this.UrlModule.findOne({ originalUrl: urlDto.originalUrl });

    if (url) {
      const { originalUrl, shortUrl } = urlDto
      return { originalUrl, shortUrl }
    }

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let shortUrlBuffer = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUrlBuffer += characters.charAt(randomIndex);
    }

    const newUrl = new this.UrlModule({originalUrl: urlDto.originalUrl, shortUrl: shortUrlBuffer})
    return newUrl.save()
  }


  // async createUrl(originalUrl: string, shortUrl: string): Promise<UrlDocument> {
  //   try {
  //     const url: Url = await Url.create({ originalUrl, shortUrl });
  //     return url;
  //   } catch (error) {
  //     throw new Error('Не удалось создать URL-адрес');
  //   }
  // }
  
  // async getUrlByShortUrl(shortUrl: string): Promise<UrlDocument | null> {
  //   try {
  //     const url: Url | null = await Url.findOne({ shortUrl });
  //     return url;
  //   } catch (error) {
  //     throw new Error('Ошибка при поиске URL-адреса');
  //   }
  // }
}

