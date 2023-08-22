import Get from '../../../../../src/application/users/athlete/Get';
import Athlete from '../../../../../src/domain/entity/users/Athlete';
import Trainer from '../../../../../src/domain/entity/users/Trainer';
import IUserRepository from '../../../../../src/domain/repository/users/IUserRepository';
import RepositoryFactoryMemory from '../../../../../src/infra/factory/RepositoryFactoryMemory';
import { generateAthlete, generateTrainer } from '../../../../seeds/user';

let athlete1: Athlete;
let athlete2: Athlete;
let trainer: Trainer;
let userRepository: IUserRepository;

beforeAll(() => {
  athlete1 = generateAthlete(1);
  athlete2 = generateAthlete(2);
  trainer = generateTrainer(3);

  trainer.addAthlete(athlete2);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  userRepository.save(athlete1);
  userRepository.save(athlete2);
  userRepository.save(trainer);
});

describe('Successful cases', () => {
  test('Get', async () => {
    const get = new Get(userRepository);
    const userData = await get.execute(athlete1.id);
    expect(userData.id).toBe(athlete1.id);
    expect(userData.name).toBe(athlete1.name);
    expect(userData.surname).toBe(athlete1.surname);
    expect(userData.username).toBe(athlete1.username);
    expect(userData.role).toBe(athlete1.role);
    expect(userData.email).toBe(athlete1.email);
    expect(userData.status).toBe(athlete1.status);
    expect(new Date(userData.created_at)).toEqual(new Date(athlete1.created_at));
    expect(new Date(userData.updated_at)).toEqual(new Date(athlete1.updated_at));
    expect(userData.deleted_at).toEqual(athlete1.deleted_at);
    expect(userData.trainer).toBeUndefined();
  });

  test('Get with trainer', async () => {
    const get = new Get(userRepository);
    const userData = await get.execute(athlete2.id);
    const athleteTrainer = { id: trainer.id, name: trainer.name, surname: trainer.surname };
    expect(userData.id).toBe(athlete2.id);
    expect(userData.name).toBe(athlete2.name);
    expect(userData.surname).toBe(athlete2.surname);
    expect(userData.username).toBe(athlete2.username);
    expect(userData.role).toBe(athlete2.role);
    expect(userData.email).toBe(athlete2.email);
    expect(userData.status).toBe(athlete2.status);
    expect(new Date(userData.created_at)).toEqual(new Date(athlete2.created_at));
    expect(new Date(userData.updated_at)).toEqual(new Date(athlete2.updated_at));
    expect(userData.deleted_at).toEqual(athlete2.deleted_at);
    expect(userData.trainer).toEqual(athleteTrainer);
  });
});

describe('Failure cases', () => {
  test('Get', async () => {
    const get = new Get(userRepository);
    expect(() => get.execute(4))
      .rejects
      .toThrow('User not found by id 4');
  });
});

