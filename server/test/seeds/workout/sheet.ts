import Exercise from "../../../src/domain/entity/workout/exercise/Exercise";
import DayTraining from "../../../src/domain/entity/workout/sheet/DayTraining";

function generateDayTraining(i: number, week: number, exercises: Exercise[]){
  return new DayTraining(i, i, week, exercises);
}

export { generateDayTraining };
