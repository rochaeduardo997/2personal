import RequestAthlete from '../../../../src/domain/entity/RequestAthlete';
import Trainer from '../../../../src/domain/entity/Trainer';
import Athlete from '../../../../src/domain/entity/Athlete';
import Make from '../../../../src/application/requestAthlete/Make';
import { generateTrainer, generateAthlete } from '../../../seeds/user';
import IUserRepository from '../../../../src/domain/repository/IUserRepository';
import IRequestAthleteRepository from '../../../../src/domain/repository/IRequestAthleteRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';

let make: Make;
let trainer: Trainer;
let athlete: Athlete;

beforeAll(() => {
  trainer = generateTrainer(1);
  athlete = generateAthlete(2);
});

beforeEach(async () => {
  let repositoryFactory = new RepositoryFactoryMemory();
  const userRepository = repositoryFactory.userRepository();
  const requestAthleteRepository = repositoryFactory.requestAthleteRepository();

  await userRepository.save(trainer);
  await userRepository.save(athlete);

  make = new Make(requestAthleteRepository, userRepository);
});

describe('Successful case', () => {
  test('Make solicitation', async () => {
    const result = await make.execute({ trainerId: trainer.id, athleteId: athlete.id });
    expect(result.id).toBe(1);
    expect(result.trainerId).toBe(trainer.id);
    expect(result.athleteId).toBe(athlete.id);
    expect(result.status).toBeUndefined();
  });
});

