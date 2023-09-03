import GetBy from "../../../../../src/application/workout/exercise/GetBy";
import Trainer from "../../../../../src/domain/entity/users/Trainer";
import Exercise from "../../../../../src/domain/entity/workout/exercise/Exercise";
import IExerciseRepository from "../../../../../src/domain/repository/workout/IExerciseRepository";
import RepositoryFactoryMemory from "../../../../../src/infra/factory/RepositoryFactoryMemory";
import { generateTrainer } from "../../../../seeds/user";
import { generateExercise } from "../../../../seeds/workout/exercise";

let exerciseRepository: IExerciseRepository;
let trainer: Trainer;
let exercise1: Exercise;
let exercise2: Exercise;

beforeEach(async () => {
  trainer   = generateTrainer(1);
  exercise1 = generateExercise(1, trainer);
  exercise2 = generateExercise(2, trainer);

  const repositoryFactory = new RepositoryFactoryMemory();
  exerciseRepository = repositoryFactory.exerciseRepository();

  exerciseRepository.save(exercise1);
  exerciseRepository.save(exercise2);
});

describe('Successful cases', () => {
  test('Get by id', async () => {
    const input = { 
      exercise_id: exercise1.id,
      trainer_id:  trainer.id
    };
    const getBy = new GetBy(exerciseRepository);
    const result = await getBy.execute(input);

    expect(result.id).toBe(input.exercise_id);
    expect(result.trainer_id).toBe(input.trainer_id);
    expect(result.category).toBe(exercise1.category);
    expect(result.name).toBe(exercise1.name);
    expect(result.reps.reps).toEqual(exercise1.reps.reps);
    expect(result.reps.sets).toEqual(exercise1.reps.sets);
    expect(result.reps.type).toEqual(exercise1.reps.type);
    expect(result.rest.rest).toEqual(exercise1.rest.rest);
    expect(result.rest.type).toEqual(exercise1.rest.type);
    expect(result.note).toBe(exercise1.note);
  });
});
