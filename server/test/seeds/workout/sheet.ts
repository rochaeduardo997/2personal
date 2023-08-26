import Exercise from "../../../src/domain/entity/workout/Exercise/Exercise";
import DayTraining from "../../../src/domain/entity/workout/Sheet/DayTraining";

function generateDayTraining(i: number, week: number, exercises: Exercise[]){
  return new DayTraining(i, i, week, exercises);
}

export { generateDayTraining };
