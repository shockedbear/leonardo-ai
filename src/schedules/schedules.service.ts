import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchedulesService {
  constructor (private prisma: PrismaService) {}

  create(createScheduleDto: CreateScheduleDto) {
    return this.prisma.schedule.create({
      data: createScheduleDto,
      include: {
        tasks: true
      }
    });
  }

  findAll() {
    return this.prisma.schedule.findMany({
      include: {
        tasks: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.schedule.findUnique({
      where: {id},
      include: {
        tasks: true,
      },
    });
  }

  update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.prisma.schedule.update({
      where: {id},
      data: updateScheduleDto,
      include: {
        tasks: true,
      }
    });
  }

  remove(id: string) {
    return this.prisma.schedule.delete({
      where: {id},
      include: {
        tasks: true,
      }
    });
  }
}
