import { Injectable } from '@nestjs/common';
import {
  CreateCourseDto,
  CreateCourseRes,
  DeleteCourseDto,
  UpdateCourseDto,
} from '../globals/protos/core';

@Injectable()
export class CourseService {
  create(createCourseDto: CreateCourseDto): CreateCourseRes {
    console.log(createCourseDto);
    return {
      desc: createCourseDto.desc,
      id: 0,
      message: ',mnm',
      price: 0,
      title: createCourseDto.title,
    };
  }
  update(updateCourseDto: UpdateCourseDto) {
    return { message: updateCourseDto };
  }
  delete(deleteCourseDto: DeleteCourseDto) {
    return { message: deleteCourseDto };
  }
}
