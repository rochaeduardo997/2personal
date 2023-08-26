import IRequestAthleteRepository from '../repository/users/IRequestAthleteRepository';
import IUserRepository from '../repository/users/IUserRepository';
import IExerciseRepository from '../repository/workout/IExerciseRepository';

interface IRepository{
  userRepository(): IUserRepository;
  requestAthleteRepository(): IRequestAthleteRepository;
  exerciseRepository(): IExerciseRepository;
}

export default IRepository;

