import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './core/interceptor/response-interceptor.service';
import { initSwagger } from './app.swagger';
import { LoggingInterceptor } from './core/interceptor/logging.interceptor';
import { initAppVersioning } from './app.versioning';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());

  initAppVersioning(app);
  initSwagger(app);

  await app.listen(3000);
}

bootstrap();

// npm run migration:generate -- src/core/config/migrations/23dec2023
// npm run migration:show
// npm run migration:revert
// npm run migration:run

// console.log(
//   this.i18n.t('translate.testLanguage', {
//     args: { lang: I18nContext.current().lang },
//   }),
// );
