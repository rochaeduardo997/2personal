import IUserRepository from '../../domain/repository/IUserRepository';
import User from '../../domain/entity/User';

class Update{
  constructor(private userRepository: IUserRepository){}

  async execute(id: number, input: TInput): Promise<TOutput>{
    const userData = await this.userRepository.get(id);
    userData.update(input);
    const result = await this.userRepository.update(userData);
    return {
      id: result.id,
      name: result.name,
      surname: result.surname,
      username: result.username,
      role: result.role,
      status: result.status,
      created_at: result.created_at,
      updated_at: result.updated_at
    };
  }
}

type TInput = {
  name:     string;
  surname:  string;
  status:   boolean;
  username: string;
  password: string;
};

type TOutput = {
  id: number;
  name: string;
  surname?: string;
  username: string;
  role: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
};

export default Update;

