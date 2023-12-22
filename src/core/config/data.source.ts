import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  migrationsTableName: 'migration',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/core/config/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  metadataTableName: 'migrations_typeorm',
};

const dataSources: DataSource = new DataSource(
  dataSourceOptions as DataSourceOptions,
);
export default dataSources;
