import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUrlDto } from 'src/dto/create-url.dto'
import { Url, UrlDocument } from 'src/schemas/url.schema'

@Injectable()
export class UrlService {

  constructor(@InjectModel(Url.name) private UrlModule: Model<UrlDocument>) {}

  async getAll(): Promise<Url[]> {
    return this.UrlModule.find().exec()
  }

  async getOne(shortUrl: string): Promise<Url> {
    return this.UrlModule.findOne({ shortUrl: shortUrl }).exec()
  }

  async create(urlDto: CreateUrlDto): Promise<Url> {
    let url: Url | null = await this.UrlModule.findOne({ originalUrl: urlDto.originalUrl })

    if (url) {      
      const { originalUrl, shortUrl } = url
      return { originalUrl, shortUrl }
    }

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let shortUrlBuffer = ''
    const length = 6

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      shortUrlBuffer += characters.charAt(randomIndex)
    }
    
    if (await this.getOne(shortUrlBuffer)) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, error: 'Такая ссылка уже существует' },
        HttpStatus.CONFLICT
      )
    }

    const newUrl = new this.UrlModule({originalUrl: urlDto.originalUrl, shortUrl: shortUrlBuffer})    
    return newUrl.save()
  }
}

