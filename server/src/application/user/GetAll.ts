import IUserRepository from '../../domain/repository/IUserRepository';
import User from '../../domain/entity/User';

class GetAll{
  constructor(private userRepository: IUserRepository){}

  async execute(): Promise<TOutput[]>{
    const users = await this.userRepository.getAll() || [];
    const result: TOutput[] = users.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        surname: user.surname,
        username: user.username,
        role: user.role,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at,
        deleted_at: user.deleted_at
      };
    });

    return result;
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

export default GetAll;

