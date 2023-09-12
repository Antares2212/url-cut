import { Request, Response } from 'express';
import UrlModel, { UrlDocument } from './../schemas/url.schema';

export async function createShortUrl(req: Request, res: Response) {
  const { originalUrl } = req.body;

  try {
    // Проверяем, существует ли уже короткая ссылка для данного originalUrl
    let url: UrlDocument | null = await UrlModel.findOne({ originalUrl });

    if (url) {
      return res.json({ shortUrl: url.shortUrl });
    }

    // Генерируем случайную короткую ссылку
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let shortUrl = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shortUrl += characters.charAt(randomIndex);
    }

    // Создаем новую запись в базе данных
    url = await UrlModel.create({ originalUrl, shortUrl });

    res.json({ shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
}

export async function getOriginalUrl(req: Request, res: Response) {
  const { shortUrl } = req.params;

  try {
    // Ищем оригинальный URL-адрес по короткой ссылке
    const url: UrlDocument | null = await UrlModel.findOne({ shortUrl });

    if (url) {
      return res.redirect(url.originalUrl);
    }

    res.status(404).json({ message: 'Короткая ссылка не найдена' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
}