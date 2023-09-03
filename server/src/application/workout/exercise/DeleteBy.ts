import Trainer from "../../../domain/entity/users/Trainer";
import IUserRepository from "../../../domain/repository/users/IUserRepository";
import IExerciseRepository from "../../../domain/repository/workout/IExerciseRepository";

class DeleteBy {
  constructor(
    private exerciseRepository: IExerciseRepository,
    private userRepository:     IUserRepository
  ){}

  async execute(input: TInput): Promise<boolean>{
    await this.userRepository.get(input.trainer_id) as Trainer;
    const result = await this.exerciseRepository.deleteBy(input.exercise_id, input.trainer_id);
    return result;
  }
}

type TInput = {
  trainer_id:  number;
  exercise_id: number;
};

export default DeleteBy;
