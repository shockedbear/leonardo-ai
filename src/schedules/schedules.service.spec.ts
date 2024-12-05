import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { faker } from '@faker-js/faker';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

function generateSchedule() {
  return {
    id: faker.string.uuid(),
    account_id: faker.number.int({min: 1, max: 100000}),
    agent_id: faker.number.int({min: 1, max: 100000}),
    start_time: faker.date.future(),
    end_time: faker.date.future(),
  };
}

describe('SchedulesService', () => {
  let service: SchedulesService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchedulesService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get(SchedulesService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns schedules', async () => {
    const schedules = [];
    prisma.schedule.findMany.mockResolvedValue(schedules);
    expect(await service.findAll()).toBe(schedules);
  });

  it('creates a schedule', async () => {
    const schedule = generateSchedule();
    prisma.schedule.create.mockResolvedValue(schedule);
    expect(await service.create(schedule as CreateScheduleDto)).toBe(schedule);
  });

  it('returns a schedule', async () => {
    const schedule = generateSchedule();
    prisma.schedule.findUnique.mockResolvedValue(schedule);
    expect(await service.findOne(schedule.id)).toBe(schedule);
  });

  it('updates a schedule', async () => {
    const schedule = generateSchedule();
    prisma.schedule.update.mockResolvedValue(schedule);
    expect(await service.update(schedule.id, schedule as UpdateScheduleDto)).toBe(schedule);
  });

  it('removes a schedule', async () => {
    const schedule = generateSchedule();
    prisma.schedule.delete.mockResolvedValue(schedule);
    expect(await service.remove(schedule.id)).toBe(schedule);
  });
});
