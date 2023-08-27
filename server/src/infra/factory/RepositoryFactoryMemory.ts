import IRepository from '../../domain/factory/IRepository';
import IUserRepository from '../../domain/repository/users/IUserRepository';
import IRequestAthleteRepository from '../../domain/repository/users/IRequestAthleteRepository';
import RequestAthleteRepositoryMemory from '../repository/users/RequestAthleteRepositoryMemory';
import IExerciseRepository from '../../domain/repository/workout/IExerciseRepository';
import ExerciseRepositoryMemory from '../repository/workout/ExerciseRepositoryMemory';
import UserRepositoryMemory from '../repository/users/UserRepositoryMemory';
import ITrainingSheetRepository from '../../domain/repository/workout/ITrainingSheetRepository';
import TrainingSheetRepositoryMemory from '../repository/workout/TrainingSheetRepositoryMemory';

class RepositoryFactoryMemory implements IRepository{
  userRepository(): IUserRepository{
    return new UserRepositoryMemory();
  }
  requestAthleteRepository(): IRequestAthleteRepository{
    return new RequestAthleteRepositoryMemory();
  }
  exerciseRepository(): IExerciseRepository{
    return new ExerciseRepositoryMemory();
  }
  trainingSheetRepository(): ITrainingSheetRepository {
    return new TrainingSheetRepositoryMemory();
  }
}

export default RepositoryFactoryMemory;

