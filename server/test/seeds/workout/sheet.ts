import Exercise from "../../../src/domain/entity/workout/Exercise/Exercise";
import DayTraining from "../../../src/domain/entity/workout/Sheet/DayTraining";

function generateDayTraining(i: number, exercises: Exercise[]){
  return new DayTraining(i, i, exercises);
}

export { generateDayTraining };
