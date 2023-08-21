import IUserRepository from '../../domain/repository/IUserRepository';
import Athlete from '../../domain/entity/Athlete';

class GetAll{
  constructor(private userRepository: IUserRepository){}

  async execute(): Promise<TOutput[]>{
    const users = (await this.userRepository.getAll('athlete') || []) as Athlete[];
    const result: TOutput[] = users.map((a: Athlete) => {
      return {
        id: a.id,
        name: a.name,
        surname: a.surname,
        username: a.username,
        role: a.role,
        email: a.email,
        status: a.status,
        created_at: a.created_at,
        updated_at: a.updated_at,
        deleted_at: a.deleted_at,
        has_trainer: !!a.trainer
      };
    });

    return result;
  }
}

type TOutput = {
  id: number;
  name: string;
  surname: string;
  username: string;
  role: string;
  email: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  has_trainer: boolean;
};

export default GetAll;
