import IUserRepository from '../../domain/repository/IUserRepository';

class GetAll{
  constructor(private userRepository: IUserRepository){}

  async execute(){
    const users = await this.userRepository.getAll();
    return users;
  }
}

export default GetAll;

