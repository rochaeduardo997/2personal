import RequestAthlete from '../../../src/domain/entity/RequestAthlete';
import Athlete from '../../../src/domain/entity/Athlete';
import Trainer from '../../../src/domain/entity/Trainer';
import RepositoryFactoryMemory from '../../../src/infra/factory/RepositoryFactoryMemory';
import IRequestAthleteRepository from '../../../src/domain/repository/IRequestAthleteRepository';
import IUserRepository from '../../../src/domain/repository/IUserRepository';
import { generateAthlete, generateTrainer } from '../../seeds/user';
import { generateRequestAthlete } from '../../seeds/requestAthlete';

let athlete: Athlete;
let trainer: Trainer;
let requestAthlete: RequestAthlete;
let userRepository: IUserRepository;
let requestAthleteRepository: IRequestAthleteRepository;

beforeEach(() => {
  athlete = generateAthlete(1);
  trainer = generateTrainer(1);
  requestAthlete = generateRequestAthlete(1, trainer, athlete);
  prepareMemory();
});

function prepareMemory(){
  let repositoryFactory = new RepositoryFactoryMemory();
  userRepository = repositoryFactory.userRepository();
  requestAthleteRepository = repositoryFactory.requestAthleteRepository();
}

describe('Successful cases', () => {
  test('Make trainer request', async () => {
    const result = await requestAthleteRepository.make(requestAthlete);
    expect(result).toBeTruthy();
  });

  test('Make trainer request to different athlete', async () => {
    const athlete2 = generateAthlete(2);
    const requestAthlete2 = generateRequestAthlete(2, trainer, athlete2);
    await requestAthleteRepository.make(requestAthlete);
    const result = await requestAthleteRepository.make(requestAthlete2);
    expect(result).toBeTruthy();
  });

  test('List trainer requests by athlete', async () => {
    await requestAthleteRepository.make(requestAthlete);
    const requestAthletes = await requestAthleteRepository.getAllByAthlete(athlete.id);
    expect(requestAthletes).toHaveLength(1);
    expect(requestAthletes[0]).toEqual(requestAthlete);
  });

  test('List trainer requests and ignore others by athlete', async () => {
    const athlete2 = generateAthlete(2);
    const requestAthlete2 = generateRequestAthlete(2, trainer, athlete2);
    await requestAthleteRepository.make(requestAthlete);
    await requestAthleteRepository.make(requestAthlete2);
    const requestAthletes = await requestAthleteRepository.getAllByAthlete(athlete.id);
    expect(requestAthletes).toHaveLength(1);
    expect(requestAthletes[0]).toEqual(requestAthlete);
  });

  test('List trainer requests by trainer', async () => {
    await requestAthleteRepository.make(requestAthlete);
    const requestAthletes = await requestAthleteRepository.getAllByTrainer(trainer.id);
    expect(requestAthletes).toHaveLength(1);
    expect(requestAthletes[0]).toEqual(requestAthlete);
  });

  test('List trainer requests and ignore others by trainer', async () => {
    const trainer2 = generateTrainer(2);
    const requestAthlete2 = generateRequestAthlete(2, trainer2, athlete);
    await requestAthleteRepository.make(requestAthlete);
    const requestAthletes = await requestAthleteRepository.getAllByTrainer(trainer.id);
    expect(requestAthletes).toHaveLength(1);
    expect(requestAthletes[0]).toEqual(requestAthlete);
  });
});

describe('Successful cases', () => {
  test('Fail on make trainer request that already exists', async () => {
    const requestAthlete2 = generateRequestAthlete(2, trainer, athlete);
    await requestAthleteRepository.make(requestAthlete);
    expect(() => requestAthleteRepository.make(requestAthlete))
      .rejects
      .toThrow(`You've already made a solicitation to ${athlete.fullname}`);
  });
});
