import Athlete from '../../../../src/domain/entity/Athlete';
import Trainer from '../../../../src/domain/entity/Trainer';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import GetAll from '../../../../src/application/athlete/GetAll';
import { generateAthlete } from '../../../seeds/user';
import { generateTrainer } from '../../../seeds/user';

let athlete1: Athlete;
let athlete2: Athlete;
let trainer: Trainer;
let userRepository: IUserRepository;

beforeAll(async () => {
  athlete1 = generateAthlete(1);
  athlete2 = generateAthlete(2);
  trainer  = generateTrainer(3);
  trainer.addAthlete(athlete2);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository          = repositoryFactory.userRepository();

  await userRepository.save(athlete1);
  await userRepository.save(athlete2);
  await userRepository.save(trainer);
});

test('Get all', async () => {
  const getAll   = new GetAll(userRepository);
  const athletes = await getAll.execute();

  expect(athletes).toHaveLength(2);
  expect(athletes[0].id).toBe(athlete1.id);
  expect(athletes[0].name).toBe(athlete1.name);
  expect(athletes[0].surname).toBe(athlete1.surname);
  expect(athletes[0].username).toBe(athlete1.username);
  expect(athletes[0].role).toBe(athlete1.role);
  expect(athletes[0].email).toBe(athlete1.email);
  expect(athletes[0].status).toBe(athlete1.status);
  expect(new Date(athletes[0].created_at)).toEqual(new Date(athlete1.created_at));
  expect(new Date(athletes[0].updated_at)).toEqual(new Date(athlete1.updated_at));
  expect(athletes[0].has_athlete).toBeFalsy();
  expect(athletes[1].deleted_at).toBeUndefined();
  expect(athletes[1].id).toBe(athlete2.id);
  expect(athletes[1].name).toBe(athlete2.name);
  expect(athletes[1].surname).toBe(athlete2.surname);
  expect(athletes[1].username).toBe(athlete2.username);
  expect(athletes[1].role).toBe(athlete2.role);
  expect(athletes[1].email).toBe(athlete2.email);
  expect(athletes[1].status).toBe(athlete2.status);
  expect(new Date(athletes[1].created_at)).toEqual(new Date(athlete2.created_at));
  expect(new Date(athletes[1].updated_at)).toEqual(new Date(athlete2.updated_at));
  expect(athletes[1].deleted_at).toBeUndefined();
  expect(athletes[1].has_athlete).toBeTruthy();
});

