import { Module } from '@nestjs/common';
import { CourseController } from '@course/course.controller';
import { CourseService } from '@course/course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '@course/entitys/course.entity';
import { RabbitMQService } from '@rmq/rabbitmq.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService, RabbitMQService],
})
export class CourseModule {}
