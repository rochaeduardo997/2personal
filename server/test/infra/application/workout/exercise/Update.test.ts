import Update from "../../../../../src/application/workout/exercise/Update";
import Trainer from "../../../../../src/domain/entity/users/Trainer";
import Exercise from "../../../../../src/domain/entity/workout/exercise/Exercise";
import IUserRepository from "../../../../../src/domain/repository/users/IUserRepository";
import IExerciseRepository from "../../../../../src/domain/repository/workout/IExerciseRepository";
import RepositoryFactoryMemory from "../../../../../src/infra/factory/RepositoryFactoryMemory";
import { generateTrainer } from "../../../../seeds/user";
import { generateExercise } from "../../../../seeds/workout/exercise";

let exerciseRepository: IExerciseRepository;
let userRepository: IUserRepository;
let trainer: Trainer;
let exercise1: Exercise;
let exercise2: Exercise;

beforeEach(async () => {
  trainer   = generateTrainer(1);
  exercise1 = generateExercise(1, trainer);
  exercise2 = generateExercise(2, trainer);

  const repositoryFactory = new RepositoryFactoryMemory();
  exerciseRepository = repositoryFactory.exerciseRepository();
  userRepository = repositoryFactory.userRepository();

  userRepository.save(trainer);
  exerciseRepository.save(exercise1);
  exerciseRepository.save(exercise2);
});

describe('Successful cases', () => {
  test('Update', async () => {
    const input = {
      trainer_id:  trainer.id,
      exercise_id: exercise1.id,
      category:    'chest',
      name:        'name',
      reps:        { sets: 1, reps: [ 1 ], type: 'normal' },
      rest:        { rest: 25, type: 2 },
      note:        'node'
    };
    const update = new Update(exerciseRepository, userRepository);
    const result = await update.execute(input);

    expect(result.id).toBe(1);
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

  test('Update with few fields', async () => {
    const input = {
      trainer_id:  trainer.id,
      exercise_id: exercise1.id,
      category:    'chest'
    };
    const update = new Update(exerciseRepository, userRepository);
    const result = await update.execute(input);

    expect(result.id).toBe(1);
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
