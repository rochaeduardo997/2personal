import Trainer from "../../../domain/entity/users/Trainer";
import Reps from "../../../domain/entity/workout/exercise/Reps";
import Rest from "../../../domain/entity/workout/exercise/Rest";
import IUserRepository from "../../../domain/repository/users/IUserRepository";
import IExerciseRepository from "../../../domain/repository/workout/IExerciseRepository";

class Update {
  constructor(
    private exerciseRepository: IExerciseRepository,
    private userRepository:     IUserRepository
  ){}

  async execute(input: TInput): Promise<TOutput>{
    const trainer  = await this.userRepository.get(input.trainer_id) as Trainer;
    const exercise = await this.exerciseRepository.getBy(input.exercise_id, input.trainer_id);
    let   reps = input.reps ? new Reps(input.reps.sets, input.reps.reps, input.reps.type) : undefined;
    let   rest = input.rest ? new Rest(input.rest.rest, input.rest.type)                  : undefined;

    exercise.update({
      category: input.category,
      name:     input.name,
      note:     input.note,
      reps, rest
    });

    const result = await this.exerciseRepository.update(exercise, trainer.id);

    return {
      id:         result.id,
      trainer_id: result.trainer.id,
      category:   result.category,
      name:       result.name,
      reps:      { 
        sets: result.reps.sets, 
        reps: result.reps.reps, 
        type: result.reps.type 
      },
      rest:      {
        rest: result.rest.rest,
        type: result.rest.type
      },
      note: result.note,
    };
  }
}

type TInput = {
  trainer_id:  number;
  exercise_id: number;
  category?:   string;
  name?:       string;
  reps?:       TRepsInput;
  rest?:       TRestInput;
  note?:       string;
};

type TRepsInput = {
  sets:  number;
  reps:  number[];
  type?: string;
};

type TRestInput = {
  rest?: number;
  type?: number;
};

type TOutput = {
  id:         number;
  trainer_id: number;
  category:   string;
  name:       string;
  reps:       TRepsInput;
  rest:       TRestInput;
  note?:      string;
};

export default Update;
