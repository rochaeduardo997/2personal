import Exercise from "../../entity/workout/exercise/Exercise";

interface IExerciseRepository{
  getAllByTrainer(id: number): Promise<Exercise[]>;
  save(exercise: Exercise): Promise<Exercise>;
}

export default IExerciseRepository;
