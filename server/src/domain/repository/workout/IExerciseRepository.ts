import Exercise from "../../entity/workout/exercise/Exercise";

interface IExerciseRepository{
  getAllByTrainer(id: number): Promise<Exercise[]>;
  save(exercise: Exercise): Promise<Exercise>;
  update(exercise: Exercise): Promise<Exercise>;
  deleteBy(id: number, trainerId: number): Promise<boolean>;
  getBy(id: number, trainerId: number): Promise<Exercise>;
}

export default IExerciseRepository;
