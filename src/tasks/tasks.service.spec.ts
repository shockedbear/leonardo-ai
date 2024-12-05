import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient, TaskEnum } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { faker } from '@faker-js/faker';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

function generateTask() {
  return {
    id: faker.string.uuid(),
    account_id: faker.number.int({min: 1, max: 100000}),
    schedule_id: faker.string.uuid(),
    start_time: faker.date.future(),
    duration: faker.number.int({min: 1}),
    type: faker.helpers.enumValue(TaskEnum),
  };
}

describe('TasksService', () => {
  let service: TasksService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get(TasksService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns tasks', async () => {
    const tasks = [];
    prisma.task.findMany.mockResolvedValue(tasks);
    expect(await service.findAll()).toBe(tasks);
  });

  it('creates a task', async () => {
    const task = generateTask();
    prisma.task.create.mockResolvedValue(task);
    expect(await service.create(task as CreateTaskDto)).toBe(task);
  });

  it('returns a task', async () => {
    const task = generateTask();
    prisma.task.findUnique.mockResolvedValue(task);
    expect(await service.findOne(task.id)).toBe(task);
  });

  it('updates a task', async () => {
    const task = generateTask();
    prisma.task.update.mockResolvedValue(task);
    expect(await service.update(task.id, task as UpdateTaskDto)).toBe(task);
  });

  it('removes a task', async () => {
    const task = generateTask();
    prisma.task.delete.mockResolvedValue(task);
    expect(await service.remove(task.id)).toBe(task);
  });
});
