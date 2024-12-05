import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ScheduleEntity } from './entities/schedule.entity';
import { Schedule } from '@prisma/client';

@Controller({
  path: 'schedules',
  version: '1'
})
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @ApiCreatedResponse({ type: ScheduleEntity })
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    return new ScheduleEntity(await this.schedulesService.create(createScheduleDto) as Schedule);
  }

  @Get()
  @ApiOkResponse({ type: ScheduleEntity, isArray: true })
  async findAll() {
    return (await this.schedulesService.findAll())
      .map(schedule => new ScheduleEntity(schedule));
  }

  @Get(':id')
  @ApiOkResponse({ type: ScheduleEntity })
  async findOne(@Param('id') id: string) {
    return new ScheduleEntity(await this.schedulesService.findOne(id) as Schedule);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ScheduleEntity })
  async update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return new ScheduleEntity(await this.schedulesService.update(id, updateScheduleDto) as Schedule);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: ScheduleEntity })
  async remove(@Param('id') id: string) {
    return new ScheduleEntity(await this.schedulesService.remove(id) as Schedule);
  }
}
