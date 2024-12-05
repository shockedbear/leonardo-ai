import { Task, TaskEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TaskEntity implements Task {
  constructor (task: Task) {
    Object.assign(this, task);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  account_id: number;

  @ApiProperty()
  schedule_id: string;

  @ApiProperty()
  start_time: Date;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  type: TaskEnum;
}