import IRepository from '../../domain/factory/IRepository';
import IUserRepository from '../../domain/repository/IUserRepository';
import UserRepositoryMemory from '../../infra/repository/UserRepositoryMemory';

class RepositoryFactoryMemory implements IRepository{
  userRepository(): IUserRepository{
    return new UserRepositoryMemory();
  }
}

export default RepositoryFactoryMemory;

