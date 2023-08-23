import DateRegisters from "../../../../src/domain/entity/common/DateRegisters";
import DayTraining from "../../../../src/domain/entity/workout/Sheet/DayTraining";
import { generateDateRegisters } from "../../../seeds/common";
import { generateExercise } from "../../../seeds/workout/exercise";
import { generateTrainer } from "../../../seeds/user";
import { generateDayTraining } from "../../../seeds/workout/sheet";
import TrainingSheet from "../../../../src/domain/entity/workout/Sheet/TrainingSheet";

let trainingSheet: TrainingSheet;
let dateRegisters: DateRegisters
let dayTraining1: DayTraining;
let dayTraining2: DayTraining;

beforeAll(() => {
  const trainer  = generateTrainer(1);
  const exercise1 = generateExercise(1, trainer);
  const exercise2 = generateExercise(1, trainer);
  dayTraining1 = generateDayTraining(1, [ exercise1 ]);
  dayTraining2 = generateDayTraining(2, [ exercise1, exercise2 ]);
  dateRegisters = generateDateRegisters(1);
  trainingSheet = new TrainingSheet(1, [ dayTraining1, dayTraining2 ], dateRegisters);
});

describe('Successful cases', () =>{
  test('Normal training sheet', () => {
  });
});
