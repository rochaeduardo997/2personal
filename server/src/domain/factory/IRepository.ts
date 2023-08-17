import IUserRepository from '../repository/IUserRepository';
import IRequestAthleteRepository from '../repository/IRequestAthleteRepository';

interface IRepository{
  userRepository(): IUserRepository;
  requestAthleteRepository(): IRequestAthleteRepository;
}

export default IRepository;

