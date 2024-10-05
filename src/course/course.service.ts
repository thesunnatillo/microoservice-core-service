import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCourseDto,
  CreateCourseRes,
  DeleteCourseDto,
  DeleteCourseRes,
  GetAllDto,
  GetAllRes,
  GetByIdDto,
  UpdateCourseDto,
  UpdateCourseRes,
} from '../globals/protos/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
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
  async getAll(getAllDto: GetAllDto): Promise<GetAllRes> {
    try {
      console.log(getAllDto);
      const courses = await this.courseRepo.find();
      console.log(courses);
      return {
        courses: courses,
      };
    } catch (err) {
      return { message: err };
      // console.log(err);
    }
  }
}
