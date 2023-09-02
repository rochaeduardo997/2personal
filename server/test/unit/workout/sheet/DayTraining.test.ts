import Exercise from "../../../../src/domain/entity/workout/exercise/Exercise";
import DayTraining from "../../../../src/domain/entity/workout/sheet/DayTraining";
import { generateExercise, generateWeightProgression } from "../../../seeds/workout/exercise";
import { generateTrainer } from "../../../seeds/user";
import Trainer from "../../../../src/domain/entity/users/Trainer";

let dayTraining: DayTraining;
let exercise1: Exercise;
let exercise2: Exercise;
let trainer: Trainer;

beforeAll(() => {
  trainer   = generateTrainer(1);
  exercise1 = generateExercise(1, trainer);
  exercise2 = generateExercise(1, trainer);
});

beforeEach(() => {
  dayTraining = new DayTraining(1, 1, 1, [ [ exercise1 ], [ exercise2 ]]);
});

describe('Successful cases', () =>{
  test('Normal day training', () => {
    expect(dayTraining.id).toBe(1);
    expect(dayTraining.day).toBe(1);
    expect(dayTraining.week).toBe(1);
    expect(dayTraining.exercises).toEqual([[ exercise1 ], [ exercise2 ]]);
    expect(dayTraining.weight_progression).toHaveLength(0);
  });

  test('Update all day training fields', () => {
    dayTraining.update({ exercises: [[ exercise2 ]] });

    expect(dayTraining.id).toBe(1);
    expect(dayTraining.day).toBe(1);
    expect(dayTraining.week).toBe(1);
    expect(dayTraining.exercises).toEqual([[ exercise2 ]]);
    expect(dayTraining.weight_progression).toHaveLength(0);
  });

  test('Add weight progression', () => {
    const weightProgression = generateWeightProgression(1, exercise1, dayTraining);
    dayTraining.addWeightProgression(weightProgression);

    expect(dayTraining.weight_progression).toEqual([ weightProgression ]);
  });
});

describe('Failure cases', () =>{
  test('Fail on add weight progression to exercise that doesnt are on day training', () => {
    const exercise3 = generateExercise(99, trainer);
    const weightProgression = generateWeightProgression(1, exercise3, dayTraining);
    expect(() => dayTraining.addWeightProgression(weightProgression)).toThrow('Exercise doesn\'t exists on day training');
  });
  test('Fail on add weight progression that already exists for exercise', () => {
    const weightProgression = generateWeightProgression(1, exercise1, dayTraining);
    dayTraining.addWeightProgression(weightProgression);
    expect(() => dayTraining.addWeightProgression(weightProgression)).toThrow('Weight progression already exists for this exercise');
  });
});
