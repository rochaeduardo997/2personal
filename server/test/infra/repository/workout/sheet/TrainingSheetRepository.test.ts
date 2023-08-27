import Trainer from "../../../../../src/domain/entity/users/Trainer";
import TrainingSheet from "../../../../../src/domain/entity/workout/sheet/TrainingSheet";
import ITrainingSheetRepository from "../../../../../src/domain/repository/workout/ITrainingSheetRepository";
import RepositoryFactoryMemory from "../../../../../src/infra/factory/RepositoryFactoryMemory";
import { generateAthlete, generateTrainer } from "../../../../seeds/user";
import { generateExercise } from "../../../../seeds/workout/exercise";
import { generateDayTraining, generateTrainingSheet } from "../../../../seeds/workout/sheet";

let trainer: Trainer;
let trainingSheet1: TrainingSheet;
let trainingSheet2: TrainingSheet;

let trainingSheetRepository: ITrainingSheetRepository;

beforeEach(() => {
  trainer        = generateTrainer(1);
  const athlete1 = generateAthlete(1, trainer);
  const athlete2 = generateAthlete(2);
  const exercise1 = generateExercise(1, trainer);
  const exercise2 = generateExercise(2, trainer);
  const dayTrainings1 = generateDayTraining(1, 1, [ exercise1, exercise2 ]);
  const dayTrainings2 = generateDayTraining(2, 1, [ exercise2, exercise1 ]);
  trainingSheet1 = generateTrainingSheet(1, trainer, athlete1, [ dayTrainings1 ]);
  trainingSheet2 = generateTrainingSheet(2, trainer, athlete2, [ dayTrainings2 ]);
  prepareMemory();
});

async function prepareMemory(){
  let repositoryFactory = new RepositoryFactoryMemory();
  trainingSheetRepository = repositoryFactory.trainingSheetRepository();
}

describe('Successful cases', () => {
  test('Save', async () => {
    const result1 = await trainingSheetRepository.save(trainer.id, trainingSheet1);

    expect(result1).toEqual(trainingSheet1);
  });
});

describe('Successful cases', () => {
  test('Fail on try to save traning sheet for athlete that doesnt has association', async () => {
    expect(() => trainingSheetRepository.save(trainer.id, trainingSheet2))
      .rejects
      .toThrow('Athlete haven\'t association with you');
  });
});
