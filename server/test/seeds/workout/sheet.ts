import DateRegisters from "../../../src/domain/entity/common/DateRegisters";
import Athlete from "../../../src/domain/entity/users/Athlete";
import Trainer from "../../../src/domain/entity/users/Trainer";
import Exercise from "../../../src/domain/entity/workout/exercise/Exercise";
import DayTraining from "../../../src/domain/entity/workout/sheet/DayTraining";
import TrainingSheet from "../../../src/domain/entity/workout/sheet/TrainingSheet";

function generateDayTraining(i: number, week: number, exercises: Exercise[][]){
  return new DayTraining(i, i, week, exercises);
}

function generateTrainingSheet(i: number, trainer: Trainer, athlete: Athlete, dayTrainings: DayTraining[], dateRegisters: DateRegisters = new DateRegisters(), whenChange: Date = new Date(`01-01-200${i}`)){
  return new TrainingSheet(i, trainer, athlete, dayTrainings, dateRegisters, whenChange);
}

export { generateDayTraining, generateTrainingSheet };
