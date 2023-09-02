import GetAllByTrainer from "../../../../../src/application/workout/exercise/GetAllByTrainer";
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
  test('Get all by trainer id', async () => {
    const input = { trainer_id: trainer.id };
    const getAllByTrainer = new GetAllByTrainer(exerciseRepository);
    const result = await getAllByTrainer.execute(input);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(1);
    expect(result[0].trainer_id).toBe(input.trainer_id);
    expect(result[0].category).toBe(exercise1.category);
    expect(result[0].name).toBe(exercise1.name);
    expect(result[0].reps.reps).toEqual(exercise1.reps.reps);
    expect(result[0].reps.sets).toEqual(exercise1.reps.sets);
    expect(result[0].reps.type).toEqual(exercise1.reps.type);
    expect(result[0].rest.rest).toEqual(exercise1.rest.rest);
    expect(result[0].rest.type).toEqual(exercise1.rest.type);
    expect(result[0].note).toBe(exercise1.note);
    expect(result[1].id).toBe(2);
    expect(result[1].trainer_id).toBe(input.trainer_id);
    expect(result[1].category).toBe(exercise2.category);
    expect(result[1].name).toBe(exercise2.name);
    expect(result[1].reps.reps).toEqual(exercise2.reps.reps);
    expect(result[1].reps.sets).toEqual(exercise2.reps.sets);
    expect(result[1].reps.type).toEqual(exercise2.reps.type);
    expect(result[1].rest.rest).toEqual(exercise2.rest.rest);
    expect(result[1].rest.type).toEqual(exercise2.rest.type);
    expect(result[1].note).toBe(exercise2.note);
  });
});
