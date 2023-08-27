import DayTraining from "../../../domain/entity/workout/sheet/DayTraining";
import TrainingSheet from "../../../domain/entity/workout/sheet/TrainingSheet";
import IExerciseRepository from "../../../domain/repository/workout/IExerciseRepository";
import ITrainingSheetRepository from "../../../domain/repository/workout/ITrainingSheetRepository";

class TrainingSheetRepositoryMemory implements ITrainingSheetRepository {
  trainingSheets: TrainingSheet[];

  constructor(){
    this.trainingSheets = [];
  }

  async save(trainerId: number, trainingSheet: TrainingSheet): Promise<TrainingSheet> {
    this.hasAthleteAssociation(trainerId, trainingSheet.athlete.trainer?.id);
    this.trainingSheets.push(trainingSheet);
    return trainingSheet;
  }

  private hasAthleteAssociation(trainerId: number, athleteTrainerId: number | undefined){
    const has = athleteTrainerId && (trainerId === athleteTrainerId);
    if(has) return;
    throw new Error('Athlete haven\'t association with you');
  }
}

export default TrainingSheetRepositoryMemory;
