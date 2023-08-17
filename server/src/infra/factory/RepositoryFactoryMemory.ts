import IRepository from '../../domain/factory/IRepository';
import IUserRepository from '../../domain/repository/IUserRepository';
import IRequestAthleteRepository from '../../domain/repository/IRequestAthleteRepository';
import UserRepositoryMemory from '../../infra/repository/UserRepositoryMemory';
import RequestAthleteRepositoryMemory from '../../infra/repository/RequestAthleteRepositoryMemory';

class RepositoryFactoryMemory implements IRepository{
  userRepository(): IUserRepository{
    return new UserRepositoryMemory();
  }
  requestAthleteRepository(): IRequestAthleteRepository{
    return new RequestAthleteRepositoryMemory();
  }
}

export default RepositoryFactoryMemory;

