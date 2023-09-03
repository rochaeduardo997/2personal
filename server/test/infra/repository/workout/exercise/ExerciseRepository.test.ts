import Trainer from "../../../../../src/domain/entity/users/Trainer";
import Exercise from "../../../../../src/domain/entity/workout/exercise/Exercise";
import Reps from "../../../../../src/domain/entity/workout/exercise/Reps";
import Rest from "../../../../../src/domain/entity/workout/exercise/Rest";
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
  test('Save normal', async () => {
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

  test('Update', async () => {
    await exerciseRepository.save(exercise1);
    await exerciseRepository.save(exercise2);
    exercise1.update({
      category: 'back',
      name: 'new name',
      note: 'new note',
      reps: new Reps(5, [ 12 ], 'dropset'),
      rest: new Rest(100, 2)
    });
    const result = await exerciseRepository.update(exercise1);
    expect(result).toEqual(exercise1);
  });

  test('Update with few fields', async () => {
    await exerciseRepository.save(exercise1);
    await exerciseRepository.save(exercise2);
    exercise1.update({ category: 'back' });
    const result = await exerciseRepository.update(exercise1);
    expect(result).toEqual(exercise1);
  });

  test('Delete by id', async () => {
    await exerciseRepository.save(exercise1);
    await exerciseRepository.save(exercise2);
    const deleteResult = await exerciseRepository.deleteBy(exercise1.id, trainer.id);
    const getAllResult = await exerciseRepository.getAllByTrainer(trainer.id);
    expect(deleteResult).toBeTruthy();
    expect(getAllResult).toHaveLength(1);
    expect(getAllResult[0]).toEqual(exercise2);
  });

  test('Get by id', async () => {
    await exerciseRepository.save(exercise1);
    await exerciseRepository.save(exercise2);
    const result = await exerciseRepository.getBy(exercise1.id, trainer.id);
    expect(result).toEqual(exercise1);
  });
});

describe('Successful cases', () => {
  test('Fail on save exercise that already exists', async () => {
    await exerciseRepository.save(exercise1);
    expect(() => exerciseRepository.save(exercise1))
      .rejects
      .toThrow('Exercise already exists for specific trainer');
  });

  test('Fail on get by id that doesnt exists', async () => {
    expect(() => exerciseRepository.getBy(1, 1))
      .rejects
      .toThrow('Exercise doesn\'t exists');
  });

  test('Fail on get by id that trainer doesnt exists', async () => {
    expect(() => exerciseRepository.getBy(exercise1.id, 1))
      .rejects
      .toThrow('Exercise doesn\'t exists');
  });

  test('Fail on update that doesnt exists', async () => {
    expect(() => exerciseRepository.update(exercise1))
      .rejects
      .toThrow('Exercise doesn\'t exists');
  });
  test('Fail on delete that doesnt exists', async () => {
    expect(() => exerciseRepository.deleteBy(exercise1.id, trainer.id))
      .rejects
      .toThrow('Exercise doesn\'t exists');
  });

  test('Fail on update that trainer doesnt exists', async () => {
    await exerciseRepository.save(exercise1);
    expect(() => exerciseRepository.deleteBy(exercise1.id, 99))
      .rejects
      .toThrow('Exercise doesn\'t exists');
  });
});
