import TrainingSheet from "../../../domain/entity/workout/sheet/TrainingSheet";
import ITrainingSheetRepository from "../../../domain/repository/workout/ITrainingSheetRepository";

class TrainingSheetRepositoryMemory implements ITrainingSheetRepository {
  trainingSheets: TrainingSheet[];

  constructor(){
    this.trainingSheets = [];
  }

  async save(trainingSheet: TrainingSheet, trainerId: number): Promise<TrainingSheet> {
    this.hasAthleteAssociation(trainerId, trainingSheet.athlete.trainer?.id);
    this.trainingSheets.push(trainingSheet);
    return trainingSheet;
  }

  private hasAthleteAssociation(trainerId: number, athleteTrainerId: number | undefined){
    const has = athleteTrainerId && (trainerId === athleteTrainerId);
    if(has) return;
    throw new Error('Athlete haven\'t association with trainer');
  }

  async getAllByTrainer(id: number): Promise<TrainingSheet[]> {
    const result = this.trainingSheets.filter((ts: TrainingSheet) => ts.trainer.id === id);
    return result;
  }

  async getAllByAthlete(id: number): Promise<TrainingSheet[]> {
    const result = this.trainingSheets.filter((ts: TrainingSheet) => ts.athlete.id === id);
    return result;
  }

  async getByTrainerBy(id: number, trainerId: number): Promise<TrainingSheet> {
    const result = this.trainingSheets.find((ts: TrainingSheet) => {
      const hasId      = ts.id === id;
      const hasTrainer = ts.trainer.id === trainerId;
      return hasId && hasTrainer;
    });
    if(!result) throw new Error();
    return result;
  }

  async getByAthleteBy(id: number, athleteId: number): Promise<TrainingSheet> {
    const result = this.trainingSheets.find((ts: TrainingSheet) => {
      const hasId      = ts.id === id;
      const hasAthlete = ts.athlete.id === athleteId;
      return hasId && hasAthlete;
    });
    if(!result) throw new Error();
    return result;
  }

  async update(trainingSheet: TrainingSheet, trainerId: number): Promise<TrainingSheet> {
    this.hasAthleteAssociation(trainerId, trainingSheet.athlete.trainer?.id);
    await this.deleteBy(trainingSheet.id, trainerId);
    this.save(trainingSheet, trainerId);
    return trainingSheet;
  }

  async deleteBy(id: number, trainerId: number): Promise<boolean>{
    await this.getByTrainerBy(id, trainerId);
    const sheetIndex = this.trainingSheets.findIndex((ts: TrainingSheet) => ts.id === id);
    this.trainingSheets.splice(sheetIndex, 1);
    return true;
  }
}

export default TrainingSheetRepositoryMemory;
