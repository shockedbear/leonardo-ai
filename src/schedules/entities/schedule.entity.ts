import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '@prisma/client';

export class ScheduleEntity implements Schedule {
  constructor (schedule: Schedule) {
    Object.assign(this, schedule);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  account_id: number;

  @ApiProperty()
  agent_id: number;

  @ApiProperty()
  start_time: Date;

  @ApiProperty()
  end_time: Date;
}