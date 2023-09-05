import Athlete from "../../../domain/entity/users/Athlete";
import Trainer from "../../../domain/entity/users/Trainer";
import Exercise from "../../../domain/entity/workout/exercise/Exercise";
import DayTraining from "../../../domain/entity/workout/sheet/DayTraining";
import TrainingSheet from "../../../domain/entity/workout/sheet/TrainingSheet";
import IUserRepository from "../../../domain/repository/users/IUserRepository";
import IExerciseRepository from "../../../domain/repository/workout/IExerciseRepository";
import ITrainingSheetRepository from "../../../domain/repository/workout/ITrainingSheetRepository";

class Add {
  constructor(
    private trainingSheetRepository: ITrainingSheetRepository,
    private userRepository:          IUserRepository,
    private exerciseRepository:      IExerciseRepository
  ){}

  async execute(input: TInput): Promise<TOutput>{
    const dayTrainings: DayTraining[] = await this.getDayTrainings(input.day_trainings, input.trainer_id);
    const trainer                     = await this.userRepository.get(input.trainer_id) as Trainer;
    const athlete                     = await this.userRepository.get(input.athlete_id) as Athlete;
    const trainingSheet               = new TrainingSheet(1, trainer, athlete, dayTrainings, undefined, input.when_change);

    const result = await this.trainingSheetRepository.save(trainingSheet, input.trainer_id);
    const output: TOutput = {
      id:            result.id,
      trainer_id:    input.trainer_id,
      athlete_id:    input.athlete_id,
      day_trainings: input.day_trainings,
      when_change:   input.when_change,
      created_at:    result.created_at
    };
    return output;
  }

  private async getDayTrainings(day_trainings: TDayTraining[], trainerId: number): Promise<DayTraining[]>{
    const dayTrainings: DayTraining[] = [];
    for(const day_training of day_trainings){
      const exercises = await this.getExercisesBy(day_training.exercise_ids, trainerId);
      const dayTraining = new DayTraining(1, day_training.day, day_training.week, exercises);
      dayTrainings.push(dayTraining);
    }
    return dayTrainings;
  }

  private async getExercisesBy(ids: number[][] = [], trainerId: number): Promise<Exercise[][]>{
    const exercisesMatrix: Exercise[][] = [];
    for(const i in ids){
      const exercises: Exercise[] = [];
      for(const j in ids[i]){
        const x = await this.exerciseRepository.getBy(ids[i][j], trainerId);
        exercises.push(x);
      }
      exercisesMatrix.push(exercises);
    }
    return exercisesMatrix;
  }
}

type TOutput = {
  id:            number;
  trainer_id:    number;
  athlete_id:    number;
  day_trainings: TDayTraining[];
  when_change?:  Date;
  created_at:    Date;
};

type TInput = {
  trainer_id:    number;
  athlete_id:    number;
  day_trainings: TDayTraining[];
  when_change?:  Date;
};

type TDayTraining = {
  id?:          number;
  day:          number;
  week:         number;
  exercise_ids: number[][];
};

export default Add;
