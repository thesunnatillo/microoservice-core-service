import { DataSource } from "typeorm";
import { Course } from './src/course/entitys/course.entity';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: ['migrations/**'],
  entities: [Course],
})