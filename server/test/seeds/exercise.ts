import DateRegisters from "../../src/domain/entity/common/DateRegisters";
import Trainer from "../../src/domain/entity/users/Trainer";
import Exercise from "../../src/domain/entity/workout/Exercise/Exercise";
import Reps from "../../src/domain/entity/workout/Exercise/Reps";
import Rest from "../../src/domain/entity/workout/Exercise/Rest";

function generateReps(sets: number = 3, reps: number[] = [ 10, 15, 20 ], type: string = 'normal'){
  return new Reps(sets, reps, type);
}

function generateRest(rest: number = 30, type: string = 'seconds'){
  return new Rest(rest, type);
}

function generateExercise(i: number, trainer: Trainer, reps: Reps = generateReps(), rest: Rest = generateRest(), dateRegisters: DateRegisters = new DateRegisters()){
  return new Exercise(i, trainer, 'chest', `exercise name ${i}`, reps, rest, dateRegisters, `note ${i}`);
}

export { generateReps, generateRest, generateExercise };
