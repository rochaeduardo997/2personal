import Athlete from "../../../domain/entity/users/Athlete";
import Trainer from "../../../domain/entity/users/Trainer";
import Exercise from "../../../domain/entity/workout/exercise/Exercise";
import DayTraining from "../../../domain/entity/workout/sheet/DayTraining";
import TrainingSheet from "../../../domain/entity/workout/sheet/TrainingSheet";
import IUserRepository from "../../../domain/repository/users/IUserRepository";
import IExerciseRepository from "../../../domain/repository/workout/IExerciseRepository";
import ITrainingSheetRepository from "../../../domain/repository/workout/ITrainingSheetRepository";

class GetAllByTrainer {
  constructor(private trainingSheetRepository: ITrainingSheetRepository){}

  async execute(id: number): Promise<TOutput[]>{
    const trainingSheets = await this.trainingSheetRepository.getAllByTrainer(id);

    const output: TOutput[] = []
    for(const trainingSheet of trainingSheets){
      const result = {
        id:          trainingSheet.id,
        trainer_id:  trainingSheet.trainer.id,
        athlete_id:  trainingSheet.athlete.id,
        when_change: trainingSheet.when_change,
        created_at:  trainingSheet.created_at,
        updated_at:  trainingSheet.updated_at
      };
      output.push(result);
    }

    return output;
  }
}

type TOutput = {
  id:           number;
  trainer_id:   number;
  athlete_id:   number;
  when_change?: Date;
  created_at:   Date;
  updated_at:   Date;
};

export default GetAllByTrainer;

