import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { TaskEntity } from './entities/task.entity';
import { Task } from '@prisma/client';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  async create (@Body() createTaskDto: CreateTaskDto) {
    return new TaskEntity(await this.tasksService.create(createTaskDto) as Task);
  }

  @Get()
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  async findAll() {
    return (await this.tasksService.findAll())
      .map(task => new TaskEntity(task));
  }

  @Get(':id')
  @ApiOkResponse({ type: TaskEntity })
  async findOne(@Param('id') id: string) {
    return new TaskEntity(await this.tasksService.findOne(id) as Task);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: TaskEntity })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return new TaskEntity(await this.tasksService.update(id, updateTaskDto) as Task);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TaskEntity })
  async remove(@Param('id') id: string) {
    return new TaskEntity(await this.tasksService.remove(id) as Task);
  }
}
