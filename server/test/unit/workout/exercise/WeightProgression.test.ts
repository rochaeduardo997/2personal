import WeightProgression from "../../../../src/domain/entity/workout/exercise/WeightProgression";
import DayTraining from "../../../../src/domain/entity/workout/sheet/DayTraining";
import { generateTrainer } from "../../../seeds/user";
import { generateExercise } from "../../../seeds/workout/exercise";
import { generateDayTraining } from "../../../seeds/workout/sheet";

let dayTraining:       DayTraining;
let weightProgression: WeightProgression;

beforeAll(() => {
  const trainer  = generateTrainer(1);
  const exercise = generateExercise(1, trainer);
  dayTraining    = generateDayTraining(1, 1, [ exercise ]);
  weightProgression = new WeightProgression(1, 5, 'kg', exercise, dayTraining);
});

describe('Successful cases', () => {
  test('Normal weight progression instance', () => {
    expect(weightProgression.id).toBe(1);
    expect(weightProgression.weight).toBe(5);
    expect(weightProgression.measure).toBe('kg');
    expect(weightProgression.exercise).toEqual(dayTraining.exercises[0]);
    expect(weightProgression.dayTraining).toEqual(dayTraining);
  });

  test('Update weight progression', () => {
    weightProgression.update({ weight: 6, measure: 'lb' });

    expect(weightProgression.id).toBe(1);
    expect(weightProgression.weight).toBe(6);
    expect(weightProgression.measure).toBe('lb');
    expect(weightProgression.exercise).toEqual(dayTraining.exercises[0]);
    expect(weightProgression.dayTraining).toEqual(dayTraining);
  });
});
