import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCourseDto,
  CreateCourseRes,
  DeleteCourseDto,
  DeleteCourseRes,
  GetAllRes,
  GetByIdDto,
  UpdateCourseDto,
  UpdateCourseRes,
} from '../global_4_core/protos/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '@course/entitys/course.entity';
import { RabbitMQService } from '@rmq/rabbitmq.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    private readonly rmqService: RabbitMQService,
  ) {}
  async create(createCourseDto: CreateCourseDto): Promise<CreateCourseRes> {
    try {
      const newCourse = {
        ...createCourseDto,
      };

      const course = await this.courseRepo.save(newCourse);

      return {
        id: course.id,
        title: course.title,
        desc: course.desc,
        price: course.price,
        message: 'Course created successfully.',
      };
    } catch (err) {
      await this.rmqService.sendMessageToRabbit(err);
      return { message: err, id: null, title: null, desc: null, price: null };
    }
  }
  async update(updateCourseDto: UpdateCourseDto): Promise<UpdateCourseRes> {
    try {
      await this.courseRepo.update(updateCourseDto.id, {
        ...updateCourseDto,
      });
      return {
        title: updateCourseDto.title,
        desc: updateCourseDto.desc,
        price: updateCourseDto.price,
        message: 'Course updated successfully.',
      };
    } catch (err) {
      await this.rmqService.sendMessageToRabbit(err);
      return { message: err, title: null, desc: null, price: null };
    }
  }
  async delete(deleteCourseDto: DeleteCourseDto): Promise<DeleteCourseRes> {
    try {
      const course = await this.courseRepo.findOne({
        where: { id: deleteCourseDto.id },
      });
      if (!course) {
        throw new NotFoundException('Course not found');
      }
      await this.courseRepo.delete({ id: deleteCourseDto.id });
      return { message: 'Deleted' };
    } catch (err) {
      await this.rmqService.sendMessageToRabbit(err);
      return { message: err };
    }
  }
  async getById(getByIdDto: GetByIdDto) {
    try {
      const course = await this.courseRepo.findOne({
        where: { id: getByIdDto.id },
      });

      return {
        id: course.id,
        title: course.title,
        desc: course.desc,
        price: course.price,
      };
    } catch (err) {
      return { message: err };
    }
  }
  async getAll(): Promise<GetAllRes> {
    try {
      const courses = await this.courseRepo.find();
      return {
        courses: courses,
      };
    } catch (err) {
      return { message: err, courses: null };
    }
  }
}
