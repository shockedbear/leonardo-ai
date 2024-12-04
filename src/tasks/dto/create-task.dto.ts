import { TaskEnum } from '@prisma/client';

export class CreateTaskDto {
  account_id: number;
  schedule_id: string;
  start_time: Date;
  duration: number;
  type: TaskEnum;
}
