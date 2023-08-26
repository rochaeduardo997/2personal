import RequestAthlete from "../../../domain/entity/users/RequestAthlete";
import Exercise from "../../../domain/entity/workout/exercise/Exercise";
import IExerciseRepository from "../../../domain/repository/workout/IExerciseRepository";

class ExerciseRepositoryMemory implements IExerciseRepository {
  private exercises: Exercise[];

  constructor(){
    this.exercises = [];
  }

  async getAllByTrainer(id: number): Promise<Exercise[]>{
    return this.exercises.filter((e: Exercise) => e.trainer.id === id);
  }

  async save(exercise: Exercise): Promise<Exercise> {
    this.alreadyExists(exercise);
    this.exercises.push(exercise);
    return exercise;
  }

  private alreadyExists(x: Exercise){
    const result = this.exercises.find((e: Exercise) => {
      const hasName    = e.name === x.name;
      const hasTrainer = e.trainer === e.trainer;
      return hasName && hasTrainer;
    });
    if(result) throw new Error('Exercise already exists for specific trainer');
  }
}

export default ExerciseRepositoryMemory;
