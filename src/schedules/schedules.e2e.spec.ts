import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { SchedulesModule } from './schedules.module';
import { SchedulesService } from './schedules.service';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { TaskEnum } from '@prisma/client';

function generateData () {
  const schedules = [];

  for (const _ of Array(10)) {
    const startTime = faker.date.future({ refDate: Date.now() });
    const schedule = {
      id: faker.string.uuid(),
      account_id: faker.number.int({ min: 1, max: 100000 }),
      agent_id: faker.number.int({ min: 1, max: 100000 }),
      start_time: startTime,
      end_time: faker.date.future({ refDate: startTime }),
      tasks: [],
    };

    for (const _ of Array(5)) {
      const taskStartTime = faker.date.between({ from: schedule.start_time, to: schedule.end_time });
      const duration = faker.date.between({
        from: taskStartTime,
        to: schedule.end_time,
      }).getTime() / 1000 - taskStartTime.getTime() / 1000;
      schedule.tasks.push({
        data: {
          id: faker.string.uuid(),
          account_id: schedule.account_id,
          schedule_id: schedule.id,
          start_time: taskStartTime,
          duration: duration,
          type: faker.helpers.enumValue(TaskEnum),
        },
      });
    }

    schedules.push(schedule);
  }

  return JSON.parse(JSON.stringify(schedules));
}

describe('Schedules', () => {
  let app: INestApplication;
  let data = generateData();
  let schedulesService = {
    findAll: () => data,
    findOne: () => data[0],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SchedulesModule],
    })
      .overrideProvider(SchedulesService)
      .useValue(schedulesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET /schedules`, () => {
    return request(app.getHttpServer())
      .get('/schedules')
      .expect(200)
      .expect(schedulesService.findAll());
  });

  it(`/GET /schedules/:id`, () => {
    return request(app.getHttpServer())
      .get('/schedules/' + data[0].id)
      .expect(200)
      .expect(schedulesService.findOne());
  });

  afterAll(async () => {
    await app.close();
  });
});
