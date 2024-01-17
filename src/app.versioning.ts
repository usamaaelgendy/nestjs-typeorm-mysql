import { INestApplication, VersioningType } from '@nestjs/common';

export const initAppVersioning = (app: INestApplication) => {
  app.enableVersioning({
    type: VersioningType.URI,
  });
};
