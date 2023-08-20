import Trainer from '../../../../src/domain/entity/Trainer';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import GetAll from '../../../../src/application/trainer/GetAll';
import { generateTrainer, generateAthlete } from '../../../seeds/user';

let trainer1: Trainer;
let trainer2: Trainer;
let userRepository: IUserRepository;

beforeAll(async () => {
  trainer1 = generateTrainer(1);
  trainer2 = generateTrainer(2);
  const athlete = generateAthlete(3);
  trainer2.addAthlete(athlete);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository          = repositoryFactory.userRepository();

  await userRepository.save(trainer1);
  await userRepository.save(trainer2);
});

test('Get all', async () => {
  const getAll   = new GetAll(userRepository);
  const trainers = await getAll.execute();

  expect(trainers).toHaveLength(2);
  expect(trainers[0].id).toBe(trainer1.id);
  expect(trainers[0].name).toBe(trainer1.name);
  expect(trainers[0].surname).toBe(trainer1.surname);
  expect(trainers[0].username).toBe(trainer1.username);
  expect(trainers[0].role).toBe(trainer1.role);
  expect(trainers[0].email).toBe(trainer1.email);
  expect(trainers[0].status).toBe(trainer1.status);
  expect(new Date(trainers[0].created_at)).toEqual(new Date(trainer1.created_at));
  expect(new Date(trainers[0].updated_at)).toEqual(new Date(trainer1.updated_at));
  expect(trainers[0].deleted_at).toEqual(trainer1.deleted_at);
  expect(trainers[0].register).toBe(trainer1.register);
  expect(trainers[0].plan).toBe(trainer1.plan);
  expect(trainers[0].athletes_limit).toBe(trainer1.athletes_limit);
  expect(trainers[0].athletes_total).toBe(0);
  expect(trainers[0].last_remove_date).toEqual(trainer1.last_remove_date);
  expect(trainers[1].id).toBe(trainer2.id);
  expect(trainers[1].name).toBe(trainer2.name);
  expect(trainers[1].surname).toBe(trainer2.surname);
  expect(trainers[1].username).toBe(trainer2.username);
  expect(trainers[1].role).toBe(trainer2.role);
  expect(trainers[1].email).toBe(trainer2.email);
  expect(trainers[1].status).toBe(trainer2.status);
  expect(new Date(trainers[1].created_at)).toEqual(new Date(trainer2.created_at));
  expect(new Date(trainers[1].updated_at)).toEqual(new Date(trainer2.updated_at));
  expect(trainers[1].deleted_at).toEqual(trainer2.deleted_at);
  expect(trainers[1].register).toBe(trainer2.register);
  expect(trainers[1].plan).toBe(trainer2.plan);
  expect(trainers[1].athletes_limit).toBe(trainer2.athletes_limit);
  expect(trainers[1].athletes_total).toBe(1);
  expect(trainers[1].last_remove_date).toEqual(trainer2.last_remove_date);
});

