import Exercise from "../../../../src/domain/entity/workout/Exercise/Exercise";
import DayTraining from "../../../../src/domain/entity/workout/Sheet/DayTraining";
import { generateExercise } from "../../../seeds/workout/exercise";
import { generateTrainer } from "../../../seeds/user";

let dayTraining: DayTraining;
let exercise1: Exercise;
let exercise2: Exercise;

beforeAll(() => {
  const trainer  = generateTrainer(1);
  exercise1 = generateExercise(1, trainer);
  exercise2 = generateExercise(1, trainer);
});

beforeEach(() => {
  dayTraining = new DayTraining(1, 1, 1, [ exercise1, exercise2 ]);
});

describe('Successful cases', () =>{
  test('Normal day training', () => {
    expect(dayTraining.id).toBe(1);
    expect(dayTraining.day).toBe(1);
    expect(dayTraining.week).toBe(1);
    expect(dayTraining.exercises).toEqual([ exercise1, exercise2 ]);
  });

  test('Update all day training fields', () => {
    dayTraining.update({ exercises: [ exercise2 ] });

    expect(dayTraining.id).toBe(1);
    expect(dayTraining.day).toBe(1);
    expect(dayTraining.week).toBe(1);
    expect(dayTraining.exercises).toEqual([ exercise2 ]);
  });
});
