import DeleteBy from "../../../../../src/application/workout/exercise/DeleteBy";
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
  test('Delete', async () => {
    const input = {
      trainer_id:  trainer.id,
      exercise_id: exercise1.id
    };
    const deleteBy = new DeleteBy(exerciseRepository, userRepository);
    const result = await deleteBy.execute(input);

    expect(result).toBeTruthy();
  });
});
