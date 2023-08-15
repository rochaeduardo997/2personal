import Trainer from '../../../../src/domain/entity/Trainer';
import Athlete from '../../../../src/domain/entity/Athlete';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import Get from '../../../../src/application/trainer/Get';
import { generateTrainer, generateAthlete } from '../../../seeds/user';

let trainer: Trainer;
let athlete: Athlete;
let userRepository: IUserRepository;

beforeAll(() => {
  trainer = generateTrainer(1);
  athlete = generateAthlete(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  userRepository.save(trainer);
});

describe('Successful cases', () => {
  test('Get trainer', async () => {
    const get = new Get(userRepository);
    const trainerData = await get.execute(trainer.id);
    expect(trainerData.id).toBe(trainer.id);
    expect(trainerData.name).toBe(trainer.name);
    expect(trainerData.surname).toBe(trainer.surname);
    expect(trainerData.username).toBe(trainer.username);
    expect(trainerData.role).toBe(trainer.role);
    expect(trainerData.email).toBe(trainer.email);
    expect(trainerData.status).toBe(trainer.status);
    expect(new Date(trainerData.created_at)).toEqual(new Date(trainer.created_at));
    expect(new Date(trainerData.updated_at)).toEqual(new Date(trainer.updated_at));
    expect(trainerData.deleted_at).toEqual(trainer.deleted_at);
    expect(trainerData.register).toBe(trainer.register);
    expect(trainerData.plan).toBe(trainer.plan);
    expect(trainerData.athletes_limit).toBe(trainer.athletes_limit);
    expect(trainerData.athletes).toEqual(trainer.athletes);
    expect(trainerData.last_remove_date).toEqual(trainer.last_remove_date);
  });

  test('Get trainer with athletes', async () => {
    trainer.addAthlete(athlete);
    await userRepository.update(trainer);
    const get = new Get(userRepository);
    const trainerData = await get.execute(trainer.id);
    expect(trainerData.id).toBe(trainer.id);
    expect(trainerData.name).toBe(trainer.name);
    expect(trainerData.surname).toBe(trainer.surname);
    expect(trainerData.username).toBe(trainer.username);
    expect(trainerData.role).toBe(trainer.role);
    expect(trainerData.email).toBe(trainer.email);
    expect(trainerData.status).toBe(trainer.status);
    expect(new Date(trainerData.created_at)).toEqual(new Date(trainer.created_at));
    expect(new Date(trainerData.updated_at)).toEqual(new Date(trainer.updated_at));
    expect(trainerData.deleted_at).toEqual(trainer.deleted_at);
    expect(trainerData.register).toBe(trainer.register);
    expect(trainerData.plan).toBe(trainer.plan);
    expect(trainerData.athletes_limit).toBe(trainer.athletes_limit);
    expect(trainerData.athletes).toEqual([{ id: athlete.id, name: athlete.name, surname: athlete.surname }]);
    expect(trainerData.last_remove_date).toEqual(trainer.last_remove_date);
  });
});

describe('Failure cases', () => {
  test('Fail on get trainer that doesnt exists', async () => {
    const get = new Get(userRepository);
    expect(() => get.execute(3))
      .rejects
      .toThrow('User not found by id 3');
  });
});

