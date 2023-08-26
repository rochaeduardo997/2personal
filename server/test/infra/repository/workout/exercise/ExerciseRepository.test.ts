import Trainer from "../../../../../src/domain/entity/users/Trainer";
import Exercise from "../../../../../src/domain/entity/workout/exercise/Exercise";
import IExerciseRepository from "../../../../../src/domain/repository/workout/IExerciseRepository";
import RepositoryFactoryMemory from "../../../../../src/infra/factory/RepositoryFactoryMemory";
import { generateTrainer } from "../../../../seeds/user";
import { generateExercise } from "../../../../seeds/workout/exercise";

let trainer:   Trainer;
let exercise1: Exercise;
let exercise2: Exercise;
let exerciseRepository: IExerciseRepository;

beforeEach(() => {
  trainer   = generateTrainer(1);
  exercise1 = generateExercise(1, trainer);
  exercise2 = generateExercise(2, trainer);
  prepareMemory();
});

async function prepareMemory(){
  let repositoryFactory = new RepositoryFactoryMemory();
  exerciseRepository = repositoryFactory.exerciseRepository();
}

describe('Successful cases', () => {
  test('Save', async () => {
    const result = await exerciseRepository.save(exercise1);
    expect(result).toBe(exercise1);
  });

  test('Get all', async () => {
    await exerciseRepository.save(exercise1);
    await exerciseRepository.save(exercise2);
    const result = await exerciseRepository.getAllByTrainer(trainer.id);
    expect(result[0]).toEqual(exercise1);
    expect(result[1]).toEqual(exercise2);
  });
});

describe('Successful cases', () => {
  test('Fail on save exercise that already exists', async () => {
    const result = await exerciseRepository.save(exercise1);
    expect(() => exerciseRepository.save(exercise1))
      .rejects
      .toThrow('Exercise already exists for specific trainer');
  });
});
