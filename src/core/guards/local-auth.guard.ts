import { AuthGuard } from '@nestjs/passport';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private readonly i18n: I18nService) {
    super();
  }

  handleRequest(err, user) {
    if (!user) {
      throw new UnauthorizedException(this.i18n.t('translate.testLanguage'));
    }
    if (err) {
      throw new InternalServerErrorException('Custom message for other errors');
    }

    return user;
  }
}
