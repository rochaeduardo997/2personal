import DateRegisters from "../../../domain/entity/common/DateRegisters";
import Trainer from "../../../domain/entity/users/Trainer";
import Exercise from "../../../domain/entity/workout/exercise/Exercise";
import Reps from "../../../domain/entity/workout/exercise/Reps";
import Rest from "../../../domain/entity/workout/exercise/Rest";
import IUserRepository from "../../../domain/repository/users/IUserRepository";
import IExerciseRepository from "../../../domain/repository/workout/IExerciseRepository";

class Add {
  constructor(
    private exerciseRepository: IExerciseRepository,
    private userRepository:     IUserRepository
  ){}

  async execute(input: TInput): Promise<TOutput>{
    const trainer = await this.userRepository.get(input.trainer_id) as Trainer;

    const reps          = new Reps(input.reps.sets, input.reps.reps, input.reps.type);
    const rest          = new Rest(input.rest?.rest, input.rest?.type);
    const dateRegisters = new DateRegisters();
    const exercise      = new Exercise(1, trainer, input.category, input.name, reps, rest, dateRegisters, input.note);

    const result = await this.exerciseRepository.save(exercise);

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
      note:      result.note,
    };
  }
}

type TInput = {
  trainer_id: number;
  category:   string;
  name:       string;
  reps:       TRepsInput;
  rest?:      TRestInput;
  note?:      string;
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
  reps?:      TRepsInput;
  rest?:      TRestInput;
  note?:      string;
};

export default Add;