import { Controller } from '@nestjs/common';
import { CourseService } from './course.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateCourseDto,
  DeleteCourseDto,
  GetAllDto,
  GetByIdDto,
  UpdateCourseDto,
} from '../global/protos/core';

@Controller()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @GrpcMethod('CoursesService', 'Create')
  create(creatCourseDto: CreateCourseDto) {
    return this.courseService.create(creatCourseDto);
  }

  @GrpcMethod('CoursesService', 'Update')
  update(updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(updateCourseDto);
  }

  @GrpcMethod('CoursesService', 'Delete')
  delete(deleteCourseDto: DeleteCourseDto) {
    return this.courseService.delete(deleteCourseDto);
  }

  @GrpcMethod('CoursesService', 'GetById')
  getById(getByIdDto: GetByIdDto) {
    return this.courseService.getById(getByIdDto);
  }

  @GrpcMethod('CoursesService', 'GetAll')
  getAll() {
    return this.courseService.getAll();
  }
}
