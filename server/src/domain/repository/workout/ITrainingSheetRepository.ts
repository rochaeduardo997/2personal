import TrainingSheet from "../../entity/workout/sheet/TrainingSheet";

interface ITrainingSheetRepository {
  save(trainingSheet: TrainingSheet, trainerId: number): Promise<TrainingSheet>;
  getAllByTrainer(id: number): Promise<TrainingSheet[]>;
  getAllByAthlete(id: number): Promise<TrainingSheet[]>;
  getByTrainerBy(id: number, trainerId: number): Promise<TrainingSheet>;
  getByAthleteBy(id: number, athleteId: number): Promise<TrainingSheet>;
}

export default ITrainingSheetRepository;
