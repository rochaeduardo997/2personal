import RequestAthlete from '../../../../../src/domain/entity/users/RequestAthlete';
import Trainer from '../../../../../src/domain/entity/users/Trainer';
import Athlete from '../../../../../src/domain/entity/users/Athlete';
import RepositoryFactoryMemory from '../../../../../src/infra/factory/RepositoryFactoryMemory';
import { generateTrainer, generateAthlete } from '../../../../seeds/user';
import { generateRequestAthlete } from '../../../../seeds/requestAthlete';
import Handle from '../../../../../src/application/users/requestAthlete/Handle';

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

