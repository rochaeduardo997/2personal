import RequestAthlete from '../../../src/domain/entity/RequestAthlete';
import Athlete from '../../../src/domain/entity/Athlete';
import Trainer from '../../../src/domain/entity/Trainer';
import RepositoryFactoryMemory from '../../../src/infra/factory/RepositoryFactoryMemory';
import IRequestAthleteRepository from '../../../src/domain/repository/IRequestAthleteRepository';
import { generateAthlete, generateTrainer } from '../../seeds/user';
import { generateRequestAthlete } from '../../seeds/requestAthlete';

let athlete: Athlete;
let trainer: Trainer;
let requestAthlete: RequestAthlete;
let requestAthleteRepository: IRequestAthleteRepository;

beforeEach(async () => {
  athlete = generateAthlete(1);
  trainer = generateTrainer(2);
  requestAthlete = generateRequestAthlete(1, trainer, athlete);
  await prepareMemory();
});

async function prepareMemory(){
  let repositoryFactory = new RepositoryFactoryMemory();
  requestAthleteRepository = repositoryFactory.requestAthleteRepository();
}

describe('Successful cases', () => {
  test('Athlete accept request', async () => {
    const request = await requestAthleteRepository.make(requestAthlete);
    const result  = await requestAthleteRepository.handle(request.id, athlete.id, true);
    expect(result).toBeTruthy();
  });

  test('Athlete refuse request', async () => {
    const request = await requestAthleteRepository.make(requestAthlete);
    const result  = await requestAthleteRepository.handle(request.id, athlete.id, false);
    expect(result).toBeTruthy();
  });

  test('Make trainer request', async () => {
    const result = await requestAthleteRepository.make(requestAthlete);
    expect(result).toEqual(requestAthlete);
  });

  test('Make trainer request to different athlete', async () => {
    const athlete2 = generateAthlete(3);
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
    const athlete2 = generateAthlete(3);
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
    const trainer2 = generateTrainer(3);
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

  test('Fail on handle request that does\'t exists', async () => {
    const request = await requestAthleteRepository.make(requestAthlete);
    expect(() => requestAthleteRepository.handle(5, athlete.id, false))
      .rejects
      .toThrow('Request doesn\'t exists');
  });

  test('Fail on handle request that athlete isnt owner', async () => {
    const request = await requestAthleteRepository.make(requestAthlete);
    expect(() => requestAthleteRepository.handle(request.id, 2, false))
      .rejects
      .toThrow('Request doesn\'t exists');
  });
});

