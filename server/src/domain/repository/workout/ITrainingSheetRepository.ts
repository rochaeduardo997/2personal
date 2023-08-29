import DayTraining from "../../entity/workout/sheet/DayTraining";
import TrainingSheet from "../../entity/workout/sheet/TrainingSheet";

interface ITrainingSheetRepository {
  save(trainingSheet: TrainingSheet, trainerId: number): Promise<TrainingSheet>;

  getAllByTrainer(id: number): Promise<TrainingSheet[]>;
  getAllByAthlete(id: number): Promise<TrainingSheet[]>;
  getByTrainerBy(id: number, trainerId: number): Promise<TrainingSheet>;
  getByAthleteBy(id: number, athleteId: number): Promise<TrainingSheet>;

  update(trainingSheet: TrainingSheet, trainerId: number): Promise<TrainingSheet>;
  deleteBy(id: number, trainerId: number): Promise<boolean>;

  addTraining(dayTraining: DayTraining, trainingSheetId: number, trainerId: number): Promise<DayTraining>;
  updateTraining(dayTraining: DayTraining, trainingSheetId: number, trainerId: number): Promise<DayTraining>;
  deleteTrainingBy(id: number, trainingSheetId: number, trainerId: number): Promise<boolean>;
}

export default ITrainingSheetRepository;
