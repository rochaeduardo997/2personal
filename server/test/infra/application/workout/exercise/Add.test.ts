import Add from "../../../../../src/application/workout/exercise/Add";
import Trainer from "../../../../../src/domain/entity/users/Trainer";
import IUserRepository from "../../../../../src/domain/repository/users/IUserRepository";
import IExerciseRepository from "../../../../../src/domain/repository/workout/IExerciseRepository";
import RepositoryFactoryMemory from "../../../../../src/infra/factory/RepositoryFactoryMemory";
import { generateTrainer } from "../../../../seeds/user";

let exerciseRepository: IExerciseRepository;
let userRepository: IUserRepository;
let trainer: Trainer;

beforeAll(async () => {
  trainer = generateTrainer(1);

  const repositoryFactory = new RepositoryFactoryMemory();
  exerciseRepository = repositoryFactory.exerciseRepository();
  userRepository     = repositoryFactory.userRepository();
  await userRepository.save(trainer);
});

describe('Successful cases', () => {
  test('Add basic', async () => {
    const input = {
      trainer_id: trainer.id,
      category:   'chest',
      name:       'name',
      reps:       { sets: 1, reps: [ 1 ], type: 'normal' },
      rest:       { rest: 25, type: 2 },
      note:       'node'
    };
    const add = new Add(exerciseRepository, userRepository);
    const result = await add.execute(input);

    expect(result.id).toBe(1);
    expect(result.trainer_id).toBe(input.trainer_id);
    expect(result.category).toBe(input.category);
    expect(result.name).toBe(input.name);
    expect(result.reps).toEqual(input.reps);
    expect(result.rest).toEqual(input.rest);
    expect(result.note).toBe(input.note);
  });

  test.todo('Add compound by 3');

  test.todo('Add without optional fields');
});
