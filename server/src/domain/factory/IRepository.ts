import IRequestAthleteRepository from '../repository/users/IRequestAthleteRepository';
import IUserRepository from '../repository/users/IUserRepository';
import IExerciseRepository from '../repository/workout/IExerciseRepository';
import ITrainingSheetRepository from '../repository/workout/ITrainingSheetRepository';

interface IRepository{
  userRepository(): IUserRepository;
  requestAthleteRepository(): IRequestAthleteRepository;
  exerciseRepository(): IExerciseRepository;
  trainingSheetRepository(): ITrainingSheetRepository;
}

export default IRepository;

