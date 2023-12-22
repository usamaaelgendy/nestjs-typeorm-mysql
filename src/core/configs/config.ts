import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('HOST'),
      port: parseInt(this.getValue('PORT')),
      username: this.getValue('USERNAME'),
      password: this.getValue('PASSWORD'),
      database: this.getValue('DATABASE'),
      entities: [this.getValue('ENTITIES')],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      ssl: this.isProduction(),
    };
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }
}

export const configService: ConfigService = new ConfigService(
  process.env,
).ensureValues([
  'TYPE',
  'HOST',
  'PORT',
  'USERNAME',
  'PASSWORD',
  'DATABASE',
  'ENTITIES',
  'MODE',
  'SYNCHRONIZE',
  'AUTOLOADENTITIES',
]);
