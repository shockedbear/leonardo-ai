import { TaskEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
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
