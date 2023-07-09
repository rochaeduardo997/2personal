import IUserRepository from '../repository/IUserRepository';

interface IRepository{
  userRepository(): IUserRepository;
}

export default IRepository;

