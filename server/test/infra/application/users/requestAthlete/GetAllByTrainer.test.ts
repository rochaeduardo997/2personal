import RequestAthlete from '../../../../../src/domain/entity/users/RequestAthlete';
import Trainer from '../../../../../src/domain/entity/users/Trainer';
import Athlete from '../../../../../src/domain/entity/users/Athlete';
import RepositoryFactoryMemory from '../../../../../src/infra/factory/RepositoryFactoryMemory';
import { generateTrainer, generateAthlete } from '../../../../seeds/user';
import { generateRequestAthlete } from '../../../../seeds/requestAthlete';
import GetAllByTrainer from '../../../../../src/application/users/requestAthlete/GetAllByTrainer';

let athlete1: Athlete;
let athlete2: Athlete;
let trainer: Trainer;
let requestAthlete1: RequestAthlete;
let requestAthlete2: RequestAthlete;

let getAllByTrainer: GetAllByTrainer;

beforeAll(() => {
  trainer = generateTrainer(1);
  athlete1 = generateAthlete(2);
  athlete2 = generateAthlete(3);
  requestAthlete1 = generateRequestAthlete(1, trainer, athlete1);
  requestAthlete2 = generateRequestAthlete(2, trainer, athlete2);
});

beforeEach(async () => {
  let repositoryFactory = new RepositoryFactoryMemory();
  const requestAthleteRepository = repositoryFactory.requestAthleteRepository();

  await requestAthleteRepository.make(requestAthlete1);
  await requestAthleteRepository.make(requestAthlete2);
  await requestAthleteRepository.handle(requestAthlete2.id, athlete2.id, true);

  getAllByTrainer = new GetAllByTrainer(requestAthleteRepository);
});

describe('Successful cases', () => {
  test('Get all', async () =>{
    const result = await getAllByTrainer.execute(trainer.id);
    expect(result[0].id).toBe(requestAthlete1.id);
    expect(result[0].trainer_id).toBe(requestAthlete1.trainer.id);
    expect(result[0].athlete_id).toBe(requestAthlete1.athlete.id);
    expect(result[0].was_accepted).toBe(requestAthlete1.was_accepted);
    expect(result[1].id).toBe(requestAthlete2.id);
    expect(result[1].trainer_id).toBe(requestAthlete2.trainer.id);
    expect(result[1].athlete_id).toBe(requestAthlete2.athlete.id);
    expect(result[1].was_accepted).toBe(requestAthlete2.was_accepted);
  });
});

