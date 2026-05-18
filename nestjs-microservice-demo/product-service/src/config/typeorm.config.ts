import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';
config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [Product],
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
