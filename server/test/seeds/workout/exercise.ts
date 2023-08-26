import DateRegisters from "../../../src/domain/entity/common/DateRegisters";
import Trainer from "../../../src/domain/entity/users/Trainer";
import Exercise from "../../../src/domain/entity/workout/exercise/Exercise";
import Reps from "../../../src/domain/entity/workout/exercise/Reps";
import Rest from "../../../src/domain/entity/workout/exercise/Rest";
import WeightProgression from "../../../src/domain/entity/workout/exercise/WeightProgression";
import DayTraining from "../../../src/domain/entity/workout/sheet/DayTraining";

function generateReps(sets: number = 3, reps: number[] = [ 10, 15, 20 ], type: string = 'normal'){
  return new Reps(sets, reps, type);
}

function generateRest(rest: number = 30, type: string = 'seconds'){
  return new Rest(rest, type);
}

function generateExercise(i: number, trainer: Trainer, reps: Reps = generateReps(), rest: Rest = generateRest(), dateRegisters: DateRegisters = new DateRegisters()){
  return new Exercise(i, trainer, 'chest', `exercise name ${i}`, reps, rest, dateRegisters, `note ${i}`);
}

function generateWeightProgression(i: number, exercise: Exercise, dayTraining: DayTraining, weight: number = 5, measure: string = 'kg'){
  return new WeightProgression(i, weight, measure, exercise, dayTraining);
}

export { 
  generateReps, 
  generateRest, 
  generateExercise,
  generateWeightProgression
};
