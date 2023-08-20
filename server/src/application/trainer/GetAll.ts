import IUserRepository from '../../domain/repository/IUserRepository';
import User from '../../domain/entity/User';
import Trainer from '../../domain/entity/Trainer';

class GetAll{
  constructor(private userRepository: IUserRepository){}

  async execute(): Promise<TOutput[]>{
    const trainers = await this.userRepository.getAll('trainer') as Trainer[];
    const result: TOutput[] = trainers.map((t: Trainer) => {
      return {
        id: t.id,
        name: t.name,
        surname: t.surname,
        username: t.username,
        role: t.role,
        email: t.email,
        status: t.status,
        created_at: t.created_at,
        updated_at: t.updated_at,
        deleted_at: t.deleted_at,
        register: t.register,
        plan: t.plan,
        athletes_limit: t.athletes_limit,
        athletes_total: t.athletes?.length,
        last_remove_date: t.last_remove_date
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
  register: string;
  plan: string;
  athletes_limit: number;
  athletes_total: number;
  last_remove_date?: Date;
};

export default GetAll;

