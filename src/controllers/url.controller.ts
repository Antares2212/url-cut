import { Get, Post, Body, Param, Controller } from '@nestjs/common';
import { Url } from './../schemas/url.schema';
import { UrlService } from 'src/services/url.service';
import { CreateUrlDto } from 'src/dto/create-url.dto';

@Controller('url')
export class UrlController {

  constructor(private readonly urlService: UrlService) {}

  @Get()
  getAll(): Promise<Url[]> {
    return this.urlService.getAll()
  }

  @Get(':shortUrl')
  getOne(@Param('shortUrl') shortUrl: string): Promise<Url> {
    return this.urlService.getOriginalUrl(shortUrl)
  }

  @Post('create')
  create(@Body() CreateUrlDto: CreateUrlDto): Promise<Url> {
    return this.urlService.create(CreateUrlDto)
  }
}