import DateRegisters from "../../../../src/domain/entity/common/DateRegisters";
import DayTraining from "../../../../src/domain/entity/workout/Sheet/DayTraining";
import { generateDateRegisters } from "../../../seeds/common";
import { generateExercise } from "../../../seeds/workout/exercise";
import { generateTrainer } from "../../../seeds/user";
import { generateDayTraining } from "../../../seeds/workout/sheet";
import TrainingSheet from "../../../../src/domain/entity/workout/Sheet/TrainingSheet";
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
  dayTraining1 = generateDayTraining(1, [ exercise1 ]);
  dayTraining2 = generateDayTraining(2, [ exercise1, exercise2 ]);
  dateRegisters = generateDateRegisters(1);
  trainingSheet = new TrainingSheet(1, trainer, athlete, [ dayTraining1, dayTraining2 ], dateRegisters, new Date('2024-01-01'));
});

describe('Successful cases', () =>{
  test('Normal training sheet', () => {
    expect(trainingSheet.id).toBe(1);
    expect(trainingSheet.trainer).toEqual(trainer);
    expect(trainingSheet.athlete).toEqual(athlete);
    expect(trainingSheet.dayTrainings).toEqual([ dayTraining1, dayTraining2 ]);
    expect(trainingSheet.dateRegisters).toEqual(dateRegisters);
    expect(trainingSheet.when_change).toEqual(new Date('2024-01-01'));
  });
});
