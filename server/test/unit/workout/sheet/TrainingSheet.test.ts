import DateRegisters from "../../../../src/domain/entity/common/DateRegisters";
import DayTraining from "../../../../src/domain/entity/workout/sheet/DayTraining";
import { generateDateRegisters } from "../../../seeds/common";
import { generateExercise } from "../../../seeds/workout/exercise";
import { generateTrainer } from "../../../seeds/user";
import { generateDayTraining } from "../../../seeds/workout/sheet";
import TrainingSheet from "../../../../src/domain/entity/workout/sheet/TrainingSheet";
import Trainer from "../../../../src/domain/entity/users/Trainer";
import Athlete from "../../../../src/domain/entity/users/Athlete";

let trainingSheet: TrainingSheet;
let dateRegisters: DateRegisters
let dayTraining1: DayTraining;
let dayTraining2: DayTraining;
let trainer: Trainer;
let athlete: Athlete;

beforeAll(() => {
  trainer  = generateTrainer(1);
  const exercise1 = generateExercise(1, trainer);
  const exercise2 = generateExercise(1, trainer);
  dayTraining1 = generateDayTraining(1, 1, [ exercise1 ]);
  dayTraining2 = generateDayTraining(2, 2, [ exercise1, exercise2 ]);
  dateRegisters = generateDateRegisters(1);
});

beforeEach(() => {
  trainingSheet = new TrainingSheet(1, trainer, athlete, [ dayTraining1, dayTraining2 ], dateRegisters, new Date('2024-01-01'));
});

describe('Successful cases', () =>{
  test('Normal training sheet', () => {
    expect(trainingSheet.id).toBe(1);
    expect(trainingSheet.trainer).toEqual(trainer);
    expect(trainingSheet.athlete).toEqual(athlete);
    expect(trainingSheet.dayTrainings).toEqual([ dayTraining1, dayTraining2 ]);
    expect(trainingSheet.created_at).toEqual(dateRegisters.created_at);
    expect(trainingSheet.updated_at).toEqual(dateRegisters.updated_at);
    expect(trainingSheet.deleted_at).toEqual(dateRegisters.deleted_at);
    expect(trainingSheet.when_change).toEqual(new Date('2024-01-01'));
  });
  test('Adding day training to sheet', () => {
    const exercise     = generateExercise(3, trainer);
    const dayTraining3 = generateDayTraining(3, 3, [ exercise ]);

    trainingSheet.addDayTraining(dayTraining3);

    expect(trainingSheet.dayTrainings).toEqual([ dayTraining1, dayTraining2, dayTraining3 ]);
  });
  test('Adding day training to sheet', () => {
    const exercise     = generateExercise(3, trainer);
    const dayTraining3 = generateDayTraining(3, 3, [ exercise ]);

    trainingSheet.addDayTraining(dayTraining3);
    trainingSheet.removeDayTraining(dayTraining2);

    expect(trainingSheet.dayTrainings).toEqual([ dayTraining1, dayTraining3 ]);
  });

  test('Update training sheet', () => {
    trainingSheet.update({ when_change: new Date('2024-02-02') });

    expect(trainingSheet.id).toBe(1);
    expect(trainingSheet.trainer).toEqual(trainer);
    expect(trainingSheet.athlete).toEqual(athlete);
    expect(trainingSheet.dayTrainings).toEqual([ dayTraining1, dayTraining2 ]);
    expect(trainingSheet.created_at).toEqual(dateRegisters.created_at);
    expect(trainingSheet.updated_at).toEqual(dateRegisters.updated_at);
    expect(trainingSheet.deleted_at).toEqual(dateRegisters.deleted_at);
    expect(trainingSheet.when_change).toEqual(new Date('2024-02-02'));
  });
});

describe('Failure cases', () =>{
  test('Fail on add a training with week and day that already exists', () => {
    const exercise     = generateExercise(3, trainer);
    const dayTraining3 = generateDayTraining(3, 3, [ exercise ]);
    trainingSheet.addDayTraining(dayTraining3);

    expect(() => trainingSheet.addDayTraining(dayTraining3)).toThrow('Already exists a training on this day at this week');
  });
  test('Fail on remove a training that doesnt exists', () => {
    const exercise     = generateExercise(3, trainer);
    const dayTraining3 = generateDayTraining(3, 3, [ exercise ]);

    expect(() => trainingSheet.removeDayTraining(dayTraining3)).toThrow('Training doesn\'t exists');
  });
});
