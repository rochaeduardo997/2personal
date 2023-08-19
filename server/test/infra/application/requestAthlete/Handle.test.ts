import RequestAthlete from '../../../../src/domain/entity/RequestAthlete';
import Trainer from '../../../../src/domain/entity/Trainer';
import Athlete from '../../../../src/domain/entity/Athlete';
import Handle from '../../../../src/application/requestAthlete/Handle';
import IRequestAthleteRepository from '../../../../src/domain/repository/IRequestAthleteRepository';
import RepositoryFactoryMemory from '../../../../src/infra/factory/RepositoryFactoryMemory';
import { generateTrainer, generateAthlete } from '../../../seeds/user';
import { generateRequestAthlete } from '../../../seeds/requestAthlete';

let handle: Handle;
let trainer: Trainer;
let athlete: Athlete;
let requestAthlete: RequestAthlete;

beforeAll(() => {
  trainer        = generateTrainer(1);
  athlete        = generateAthlete(2);
  requestAthlete = generateRequestAthlete(1, trainer, athlete);
});

beforeEach(async () => {
  const repositoryFactory        = new RepositoryFactoryMemory();
  const requestAthleteRepository = repositoryFactory.requestAthleteRepository();

  requestAthlete = await requestAthleteRepository.make(requestAthlete);

  handle = new Handle(requestAthleteRepository);
});

describe('Successful case', () => {
  test('Accept request', async () => {
    const result = await handle.execute({ id: requestAthlete.id, athlete_id: athlete.id, was_accepted: true });
    expect(result).toBeTruthy();
  });

  test('Refuse request', async () => {
    const result = await handle.execute({ id: requestAthlete.id, athlete_id: athlete.id, was_accepted: false });
    expect(result).toBeTruthy();
  });
});

