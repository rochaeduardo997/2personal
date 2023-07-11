import IUserRepository from '../../domain/repository/IUserRepository';
import User from '../../domain/entity/User';

class Get{
  constructor(private userRepository: IUserRepository){}

  async execute(id: number): Promise<User>{
    const result = await this.userRepository.get(id);
    return result;
  }
}

export default Get;

