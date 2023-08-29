import DayTraining from "../../../domain/entity/workout/sheet/DayTraining";
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
    await this.deleteBy(trainingSheet.id, trainerId);
    this.save(trainingSheet, trainerId);
    return trainingSheet;
  }

  async deleteBy(id: number, trainerId: number): Promise<boolean>{
    const trainingSheet = await this.getByTrainerBy(id, trainerId);
    this.hasAthleteAssociation(trainerId, trainingSheet.athlete.trainer?.id);
    await this.getByTrainerBy(id, trainerId);
    const sheetIndex = this.trainingSheets.findIndex((ts: TrainingSheet) => ts.id === id);
    this.trainingSheets.splice(sheetIndex, 1);
    return true;
  }

  async addTraining(dayTraining: DayTraining, trainingSheetId: number, trainerId: number): Promise<DayTraining> {
    const trainingSheet = await this.getByTrainerBy(trainingSheetId, trainerId);
    trainingSheet.addDayTraining(dayTraining);
    await this.update(trainingSheet, trainerId);
    return dayTraining;
  }

  async updateTraining(dayTraining: DayTraining, trainingSheetId: number, trainerId: number): Promise<DayTraining> {
    const trainingSheet = await this.getByTrainerBy(trainingSheetId, trainerId);
    const dayTrainingToRemove = trainingSheet.day_trainings.find((dt: DayTraining) => dt.id === dayTraining.id);
    if(!dayTrainingToRemove) throw new Error();
    trainingSheet.removeDayTraining(dayTrainingToRemove);
    trainingSheet.addDayTraining(dayTraining);
    await this.update(trainingSheet, trainerId);
    return dayTraining;
  }

  async deleteTrainingBy(id: number, trainingSheetId: number, trainerId: number): Promise<boolean> {
    const trainingSheet = await this.getByTrainerBy(trainingSheetId, trainerId);
    const dayTrainingToRemove = trainingSheet.day_trainings.find((dt: DayTraining) => dt.id === id);
    if(!dayTrainingToRemove) throw new Error();
    trainingSheet.removeDayTraining(dayTrainingToRemove);
    await this.update(trainingSheet, trainerId);
    return true;
  }
}

export default TrainingSheetRepositoryMemory;
