import UrlModel, { UrlDocument } from 'src/schemas/url.schema';

export async function createUrl(originalUrl: string, shortUrl: string): Promise<UrlDocument> {
  try {
    const url: UrlDocument = await UrlModel.create({ originalUrl, shortUrl });
    return url;
  } catch (error) {
    throw new Error('Не удалось создать URL-адрес');
  }
}

export async function getUrlByShortUrl(shortUrl: string): Promise<UrlDocument | null> {
  try {
    const url: UrlDocument | null = await UrlModel.findOne({ shortUrl });
    return url;
  } catch (error) {
    throw new Error('Ошибка при поиске URL-адреса');
  }
}