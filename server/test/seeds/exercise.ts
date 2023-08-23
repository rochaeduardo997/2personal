import Reps from "../../src/domain/entity/workout/Exercise/Reps";
import Rest from "../../src/domain/entity/workout/Exercise/Rest";

function generateReps(sets: number = 3, reps: number[] = [ 10, 15, 20 ], type: string = 'normal'){
  return new Reps(sets, reps, type);
}

function generateRest(rest: number = 30, type: string = 'seconds'){
  return new Rest(rest, type);
}

export { generateReps, generateRest };
