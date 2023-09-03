import IExerciseRepository from "../../../domain/repository/workout/IExerciseRepository";

class GetAllByTrainer {
  constructor(private exerciseRepository: IExerciseRepository){}

  async execute(input: TInput): Promise<TOutput[]>{
    const result = await this.exerciseRepository.getAllByTrainer(input.trainer_id);
    const output: TOutput[] = [];

    for(const exercise of result){
      output.push({
        id:         exercise.id,
        trainer_id: exercise.trainer.id,
        category:   exercise.category,
        name:       exercise.name,
        reps:      { 
          sets: exercise.reps.sets, 
          reps: exercise.reps.reps, 
          type: exercise.reps.type 
        },
        rest:      {
          rest: exercise.rest.rest,
          type: exercise.rest.type
        },
        note: exercise.note,
      });
    }

    return output;
  }
}

type TInput = { trainer_id: number };

type TRepsInput = {
  sets:  number;
  reps:  number[];
  type?: string;
};

type TRestInput = {
  rest: number;
  type: number;
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

export default GetAllByTrainer;
