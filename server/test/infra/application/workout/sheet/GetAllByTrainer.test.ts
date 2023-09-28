import GetAllByTrainer from "../../../../../src/application/workout/sheet/GetAllByTrainer";
import Athlete from "../../../../../src/domain/entity/users/Athlete";
import Trainer from "../../../../../src/domain/entity/users/Trainer";
import Exercise from "../../../../../src/domain/entity/workout/exercise/Exercise";
import DayTraining from "../../../../../src/domain/entity/workout/sheet/DayTraining";
import TrainingSheet from "../../../../../src/domain/entity/workout/sheet/TrainingSheet";
import IUserRepository from "../../../../../src/domain/repository/users/IUserRepository";
import IExerciseRepository from "../../../../../src/domain/repository/workout/IExerciseRepository";
import ITrainingSheetRepository from "../../../../../src/domain/repository/workout/ITrainingSheetRepository";
import RepositoryFactoryMemory from "../../../../../src/infra/factory/RepositoryFactoryMemory";
import { generateAthlete, generateTrainer } from "../../../../seeds/user";
import { generateExercise } from "../../../../seeds/workout/exercise";
import { generateDayTraining, generateTrainingSheet } from "../../../../seeds/workout/sheet";

let trainer: Trainer;
let athlete: Athlete;
let exercise: Exercise;
let dayTraining1: DayTraining;
let dayTraining2: DayTraining;
let trainingSheet1: TrainingSheet;
let trainingSheet2: TrainingSheet;

let trainingSheetRepository: ITrainingSheetRepository;
let userRepository:          IUserRepository;
let exerciseRepository:      IExerciseRepository;

beforeAll(async () => {
  athlete        = generateAthlete(1);
  trainer        = generateTrainer(2);
  trainer.addAthlete(athlete);
  exercise       = generateExercise(1, trainer);
  dayTraining1   = generateDayTraining(1, 1, [[ exercise ]]);
  dayTraining2   = generateDayTraining(2, 1, [[ exercise ]]);
  trainingSheet1 = generateTrainingSheet(1, trainer, athlete, [ dayTraining1, dayTraining2 ]);
  trainingSheet2 = generateTrainingSheet(2, trainer, athlete, [ dayTraining1, dayTraining2 ]);

  const repositoryFactory = new RepositoryFactoryMemory();
  trainingSheetRepository = repositoryFactory.trainingSheetRepository();
  userRepository          = repositoryFactory.userRepository();
  exerciseRepository      = repositoryFactory.exerciseRepository();

  await userRepository.save(athlete);
  await userRepository.save(trainer);
  await exerciseRepository.save(exercise);
  await trainingSheetRepository.save(trainingSheet1, trainer.id);
  await trainingSheetRepository.save(trainingSheet2, trainer.id);
});

describe('Successful cases', () => {
  test('Get all training sheet by trainer id', async () => {
    const getAllByTrainer = new GetAllByTrainer(trainingSheetRepository);
    const result = await getAllByTrainer.execute(trainer.id);
    const output = [
      {
        id:          trainingSheet1.id,
        trainer_id:  trainer.id,
        athlete_id:  athlete.id,
        when_change: trainingSheet1.when_change,
        created_at:  trainingSheet1.created_at,
        updated_at:  trainingSheet1.updated_at
      },
      {
        id:          trainingSheet2.id,
        trainer_id:  trainer.id,
        athlete_id:  athlete.id,
        when_change: trainingSheet2.when_change,
        created_at:  trainingSheet2.created_at,
        updated_at:  trainingSheet2.updated_at
      }
    ]
    expect(result).toEqual(output);
  });
});