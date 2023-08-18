import RequestAthlete from '../../../../src/domain/entity/RequestAthlete';
import Trainer from '../../../../src/domain/entity/Trainer';
import Athlete from '../../../../src/domain/entity/Athlete';
import GetAllByAthlete from '../../../../src/application/requestAthlete/GetAllByAthlete';
import IRequestAthleteRepository from '../../../../src/domain/repository/IRequestAthleteRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import { generateTrainer, generateAthlete } from '../../../seeds/user';
import { generateRequestAthlete } from '../../../seeds/requestAthlete';

let athlete: Athlete;
let trainer1: Trainer;
let trainer2: Trainer;
let requestAthlete1: RequestAthlete;
let requestAthlete2: RequestAthlete;

let getAllByAthlete: GetAllByAthlete;

beforeAll(() => {
  trainer1 = generateTrainer(1);
  trainer2 = generateTrainer(2);
  athlete = generateAthlete(3);
  requestAthlete1 = generateRequestAthlete(1, trainer1, athlete);
  requestAthlete2 = generateRequestAthlete(2, trainer2, athlete);
});

beforeEach(async () => {
  let repositoryFactory = new RepositoryFactoryMemory();
  const requestAthleteRepository = repositoryFactory.requestAthleteRepository();

  await requestAthleteRepository.make(requestAthlete1);
  await requestAthleteRepository.make(requestAthlete2);
  await requestAthleteRepository.handle(requestAthlete2.id, athlete.id, true);

  getAllByAthlete = new GetAllByAthlete(requestAthleteRepository);
});

describe('Successful cases', () => {
  test('Get all', async () =>{
    const result = await getAllByAthlete.execute(athlete.id);
    console.log(athlete);
    expect(result[0].id).toBe(requestAthlete1.id);
    expect(result[0].trainerId).toBe(requestAthlete1.trainer.id);
    expect(result[0].athleteId).toBe(requestAthlete1.athlete.id);
    expect(result[0].status).toBe(requestAthlete1.wasAccepted);
    expect(result[1].id).toBe(requestAthlete2.id);
    expect(result[1].trainerId).toBe(requestAthlete2.trainer.id);
    expect(result[1].athleteId).toBe(requestAthlete2.athlete.id);
    expect(result[1].status).toBe(requestAthlete2.wasAccepted);
  });
});

