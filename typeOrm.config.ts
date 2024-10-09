// typeOrm.config.ts

import { DataSource } from "typeorm";
import { Course } from './src/course/course.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '7582',
  database: 'course_db',
  migrations: ['migrations/**'],
  entities: [Course],
})