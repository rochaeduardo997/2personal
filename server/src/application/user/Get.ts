import IUserRepository from '../../domain/repository/IUserRepository';
import User from '../../domain/entity/User';

class Get{
  constructor(private userRepository: IUserRepository){}

  async execute(id: number): Promise<TOutput>{
    const result = await this.userRepository.get(id);
    return {
      id: result.id,
      name: result.name,
      surname: result.surname,
      username: result.username,
      role: result.role,
      status: result.status,
      created_at: result.created_at,
      updated_at: result.updated_at,
      deleted_at: result.updated_at
    };
  }
}

type TOutput = {
  id: number;
  name: string;
  surname?: string;
  username: string;
  role: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};

export default Get;

