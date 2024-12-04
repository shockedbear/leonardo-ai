import { faker } from '@faker-js/faker';
import { PrismaClient, TaskEnum } from '@prisma/client';
import * as process from 'node:process';

const prisma = new PrismaClient();

async function main() {
  for (const _ of Array(10)) {
    const startTime = faker.date.future({refDate: Date.now()});
    const schedule = await prisma.schedule.create({data: {
      account_id: faker.number.int({min: 1, max: 100000}),
      agent_id: faker.number.int({min: 1, max: 100000}),
      start_time: startTime,
      end_time: faker.date.future({refDate: startTime}),
    }});

    for (const _ of Array(5)) {
      const taskStartTime = faker.date.between({from: schedule.start_time, to: schedule.end_time});
      const duration = faker.date.between({from: taskStartTime, to: schedule.end_time}).getTime() / 1000 - taskStartTime.getTime() / 1000;
      await prisma.task.create({data: {
        account_id: schedule.account_id,
        schedule_id: schedule.id,
        start_time: taskStartTime,
        duration: duration,
        type: faker.helpers.enumValue(TaskEnum),
      }});
    }
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });