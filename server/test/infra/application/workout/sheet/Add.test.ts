import Add from "../../../../../src/application/workout/sheet/Add";
import Athlete from "../../../../../src/domain/entity/users/Athlete";
import Trainer from "../../../../../src/domain/entity/users/Trainer";
import Exercise from "../../../../../src/domain/entity/workout/exercise/Exercise";
import DayTraining from "../../../../../src/domain/entity/workout/sheet/DayTraining";
import IUserRepository from "../../../../../src/domain/repository/users/IUserRepository";
import IExerciseRepository from "../../../../../src/domain/repository/workout/IExerciseRepository";
import ITrainingSheetRepository from "../../../../../src/domain/repository/workout/ITrainingSheetRepository";
import RepositoryFactoryMemory from "../../../../../src/infra/factory/RepositoryFactoryMemory";
import { generateAthlete, generateTrainer } from "../../../../seeds/user";
import { generateExercise } from "../../../../seeds/workout/exercise";
import { generateDayTraining } from "../../../../seeds/workout/sheet";

let trainer: Trainer;
let athlete: Athlete;
let exercise: Exercise;
let dayTraining1: DayTraining;
let dayTraining2: DayTraining;

let trainingSheetRepository: ITrainingSheetRepository;
let userRepository:          IUserRepository;
let exerciseRepository:      IExerciseRepository;

beforeAll(async () => {
  athlete = generateAthlete(1);
  trainer = generateTrainer(2);
  trainer.addAthlete(athlete);
  exercise = generateExercise(1, trainer);
  dayTraining1 = generateDayTraining(1, 1, [[ exercise ]]);
  dayTraining2 = generateDayTraining(2, 1, [[ exercise ]]);

  const repositoryFactory = new RepositoryFactoryMemory();
  trainingSheetRepository = repositoryFactory.trainingSheetRepository();
  userRepository          = repositoryFactory.userRepository();
  exerciseRepository      = repositoryFactory.exerciseRepository();

  await userRepository.save(athlete);
  await userRepository.save(trainer);
  await exerciseRepository.save(exercise);
});

describe('Successful cases', () => {
  test('Save', async () => {
    const dayTrainingInput1 = {
      id:           1,
      day:          dayTraining1.day,
      week:         dayTraining1.week,
      exercise_ids: [[ exercise.id ]]
    };
    const dayTrainingInput2 = {
      id:           2,
      day:          dayTraining2.day,
      week:         dayTraining2.week,
      exercise_ids: [[ exercise.id ]]
    };
    const input = {
      id:            1,
      trainer_id:    trainer.id,
      athlete_id:    athlete.id,
      day_trainings: [ dayTrainingInput1, dayTrainingInput2 ],
      when_change:   new Date('2024-04-04T00:00:00')
    };

    const add = new Add(trainingSheetRepository, userRepository, exerciseRepository);
    const result = await add.execute(input);
    expect(result.id).toBe(input.id);
    expect(result.trainer_id).toBe(input.trainer_id);
    expect(result.athlete_id).toBe(input.athlete_id);
    expect(result.day_trainings).toBe(input.day_trainings);
    expect(result.when_change).toBe(input.when_change);
    expect(result.created_at).toBeInstanceOf(Date);
  });
});
