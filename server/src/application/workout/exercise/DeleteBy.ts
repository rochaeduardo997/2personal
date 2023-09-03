import IExerciseRepository from "../../../domain/repository/workout/IExerciseRepository";

class DeleteBy {
  constructor(private exerciseRepository: IExerciseRepository){}

  async execute(input: TInput): Promise<boolean>{
    const result = await this.exerciseRepository.deleteBy(input.exercise_id, input.trainer_id);
    return result;
  }
}

type TInput = {
  trainer_id:  number;
  exercise_id: number;
};

export default DeleteBy;
