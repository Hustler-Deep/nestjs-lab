import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Product } from 'src/entities/product.entity';
config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [Product],
  migrations: ['dist/database/migrations/**/*{.ts,.js}'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
