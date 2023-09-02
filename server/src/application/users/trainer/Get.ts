import Athlete from "../../../domain/entity/users/Athlete";
import Trainer from "../../../domain/entity/users/Trainer";
import IUserRepository from "../../../domain/repository/users/IUserRepository";

class Get{
  constructor(private userRepository: IUserRepository){}

  async execute(id: number): Promise<TOutput>{
    const result = await this.userRepository.get(id) as Trainer;
    const athletes: TAthleteOutput[] = (result.athletes || []).map((a: Athlete) => {
      return {
        id:      a.id,
        name:    a.name,
        surname: a.surname
      };
    });

    return {
      id: result.id,
      name: result.name,
      surname: result.surname,
      username: result.username,
      role: result.role,
      email: result.email,
      status: result.status,
      created_at: result.created_at,
      updated_at: result.updated_at,
      deleted_at: result.deleted_at,
      register: result.register,
      plan: result.plan,
      athletes_limit: result.athletes_limit,
      athletes,
      last_remove_date: result.last_remove_date
    };
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
  athletes: TAthleteOutput[];
  last_remove_date?: Date;
};

type TAthleteOutput = {
  id: number;
  name: string;
  surname: string;
};

export default Get;

