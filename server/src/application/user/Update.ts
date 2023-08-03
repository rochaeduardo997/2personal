import IUserRepository from '../../domain/repository/IUserRepository';
import User from '../../domain/entity/User';

class Update{
  constructor(private userRepository: IUserRepository){}

  async execute(id: number, input: TInput): Promise<User>{
    const userData = await this.userRepository.get(id);
    userData.update(input);
    const result = await this.userRepository.update(userData);
    return result;
  }
}

export default Update;

type TInput = {
  name:     string;
  surname:  string;
  status:   boolean;
  username: string;
  password: string;
};

