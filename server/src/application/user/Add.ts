import IUserRepository from '../../domain/repository/IUserRepository';
import User from '../../domain/entity/User';

class Add{
  constructor(private userRepository: IUserRepository){}

  async execute(user: User): Promise<User>{
    const result = await this.userRepository.save(user);
    return result;
  }
}

export default Add;

