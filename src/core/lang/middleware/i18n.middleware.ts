import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as i18n from 'i18n';

@Injectable()
export class I18nMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next) {
    console.log(req.headers['accept-language']);
    const userLang = req.headers['accept-language'] || 'en';
    i18n.configure({
      locales: ['en', 'ar'],
      directory: __dirname + '/../../i18n',
      defaultLocale: 'en',
      queryParameter: 'lang',
    });
    i18n.setLocale(userLang);
    next();
  }
}
