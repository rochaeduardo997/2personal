import Athlete from "../../../../../src/domain/entity/users/Athlete";
import Trainer from "../../../../../src/domain/entity/users/Trainer";
import TrainingSheet from "../../../../../src/domain/entity/workout/sheet/TrainingSheet";
import ITrainingSheetRepository from "../../../../../src/domain/repository/workout/ITrainingSheetRepository";
import RepositoryFactoryMemory from "../../../../../src/infra/factory/RepositoryFactoryMemory";
import { generateAthlete, generateTrainer } from "../../../../seeds/user";
import { generateExercise } from "../../../../seeds/workout/exercise";
import { generateDayTraining, generateTrainingSheet } from "../../../../seeds/workout/sheet";

let athlete1: Athlete;
let trainer1: Trainer;
let trainer2: Trainer;
let trainingSheet1: TrainingSheet;
let trainingSheet2: TrainingSheet;

let trainingSheetRepository: ITrainingSheetRepository;

beforeEach(async () => {
  trainer1        = generateTrainer(1);
  trainer2        = generateTrainer(2);
  athlete1        = generateAthlete(3, trainer1);
  const exercise1 = generateExercise(1, trainer1);
  const exercise2 = generateExercise(2, trainer1);
  const dayTrainings1 = generateDayTraining(1, 1, [ exercise1, exercise2 ]);
  const dayTrainings2 = generateDayTraining(2, 1, [ exercise2, exercise1 ]);
  trainingSheet1 = generateTrainingSheet(1, trainer1, athlete1, [ dayTrainings1 ]);
  trainingSheet2 = generateTrainingSheet(2, trainer1, athlete1, [ dayTrainings2 ]);
  prepareMemory();
  await trainingSheetRepository.save(trainingSheet1, trainer1.id);
  await trainingSheetRepository.save(trainingSheet2, trainer1.id);
});

async function prepareMemory(){
  let repositoryFactory = new RepositoryFactoryMemory();
  trainingSheetRepository = repositoryFactory.trainingSheetRepository();
}

describe('Successful cases', () => {
  test('Save', async () => {
    const result = await trainingSheetRepository.save(trainingSheet1, trainer1.id);

    expect(result).toEqual(trainingSheet1);
  });

  test('Get by trainer id', async () => {
    const result = await trainingSheetRepository.getAllByTrainer(trainer1.id);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(trainingSheet1);
    expect(result[1]).toEqual(trainingSheet2);
  });

  test('Get all by athlete id', async () => {
    const result = await trainingSheetRepository.getAllByAthlete(athlete1.id);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(trainingSheet1);
    expect(result[1]).toEqual(trainingSheet2);
  });

  test('Get sheet by trainer by id', async () => {
    const result = await trainingSheetRepository.getByTrainerBy(trainingSheet1.id, trainer1.id);

    expect(result).toEqual(trainingSheet1);
  });

  test('Get sheet by athlete by id', async () => {
    const result = await trainingSheetRepository.getByAthleteBy(trainingSheet2.id, athlete1.id);

    expect(result).toEqual(trainingSheet2);
  });

  test('Update', async () => {
    trainingSheet1.update({ when_change: new Date('2024-01-01') });
    const result = await trainingSheetRepository.update(trainingSheet1, trainer1.id);

    expect(result).toEqual(trainingSheet1);
  });

  test('Add day training to training sheet', async () => {
    const exercise1 = generateExercise(4, trainer1);
    const exercise2 = generateExercise(5, trainer1);
    const newDayTraining = generateDayTraining(3, 1, [ exercise1, exercise2 ]);
    const result = await trainingSheetRepository.addTraining(newDayTraining, trainingSheet1.id, trainer1.id);
    const newTrainingSheet = await trainingSheetRepository.getByTrainerBy(trainingSheet1.id, trainer1.id);

    expect(result).toEqual(newDayTraining);
    expect(newTrainingSheet.day_trainings[1]).toEqual(newDayTraining);
  });
  test.todo('Update day training from training sheet');
  test.todo('Remove day training to training sheet');
});

describe('Successful cases', () => {
  test('Fail on try to save traning sheet for athlete that doesnt has association', async () => {
    const exercise1 = generateExercise(1, trainer1);
    const exercise2 = generateExercise(2, trainer1);
    const dayTrainings2 = generateDayTraining(2, 1, [ exercise2, exercise1 ]);
    const athlete2      = generateAthlete(4, trainer2);
    const trainingSheet3 = generateTrainingSheet(3, trainer1, athlete2, [ dayTrainings2 ]);

    expect(() => trainingSheetRepository.save(trainingSheet3, trainer1.id))
      .rejects
      .toThrow('Athlete haven\'t association with trainer');
  });

  test('Error when try to add day training on week and day that already exists', async () => {
    const exercise1 = generateExercise(4, trainer1);
    const newDayTraining = generateDayTraining(3, 1, [ exercise1 ]);
    trainingSheet1.addDayTraining(newDayTraining);
    expect(() => trainingSheetRepository.addTraining(newDayTraining, trainingSheet1.id, trainer1.id))
      .rejects
      .toThrow('Already exists a training on this day at this week');
  });

  test.todo('Error when try to get sheet from other trainer');

  test.todo('Error when try to get sheet from other athlete');

  test.todo('Error when try to update sheet from other trainer');

  test.todo('Error when try to delete sheet from other trainer');
});
