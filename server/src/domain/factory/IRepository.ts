import IUserRepository from '../repository/IUserRepository';
import IRequestAthleteRepository from '../repository/users/IRequestAthleteRepository';

interface IRepository{
  userRepository(): IUserRepository;
  requestAthleteRepository(): IRequestAthleteRepository;
}

export default IRepository;

