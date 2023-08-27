import TrainingSheet from "../../entity/workout/sheet/TrainingSheet";

interface ITrainingSheetRepository {
  save(trainerId: number, trainingSheet: TrainingSheet): Promise<TrainingSheet>
}

export default ITrainingSheetRepository;
