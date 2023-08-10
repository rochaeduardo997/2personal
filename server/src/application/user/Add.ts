import IUserRepository from '../../domain/repository/IUserRepository';
import User from '../../domain/entity/User';

class Add{
  constructor(private userRepository: IUserRepository){}

  async execute(input: TInput): Promise<TOutput>{
    const user = new User(1, input.name, input.surname, input.username, input.password, input.role, true);
    const result = await this.userRepository.save(user);
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

type TOutput = {
  id: number;
  name: string;
  surname: string;
  username: string;
  role: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
};

type TInput = {
  name: string;
  surname: string;
  username: string;
  role: string;
  password: string;
};

export default Add;

