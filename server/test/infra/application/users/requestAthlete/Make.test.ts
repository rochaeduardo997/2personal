import Make from "../../../../../src/application/users/requestAthlete/Make";
import Athlete from "../../../../../src/domain/entity/Athlete";
import Trainer from "../../../../../src/domain/entity/Trainer";
import RepositoryFactoryMemory from "../../../../../src/infra/factory/RepositoryFactoryMemory";
import { generateTrainer, generateAthlete } from "../../../../seeds/user";

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
    const result = await make.execute({ trainer_id: trainer.id, athlete_id: athlete.id });
    expect(result.id).toBe(1);
    expect(result.trainer_id).toBe(trainer.id);
    expect(result.athlete_id).toBe(athlete.id);
    expect(result.was_accepted).toBeUndefined();
  });
});

