import IUserRepository from '../../domain/repository/IUserRepository';
import Athlete from '../../domain/entity/Athlete';
import Trainer from '../../domain/entity/Trainer';

class Get{
  constructor(private userRepository: IUserRepository){}

  async execute(id: number): Promise<TOutput>{
    const result = await this.userRepository.get(id) as Athlete;
    const trainer = this.hasTrainer(result.trainer);

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
      trainer
    };
  }

  private hasTrainer(trainer?: Trainer): TTrainerOutput | undefined{
    if(trainer)
      return {
        id:      trainer.id,
        name:    trainer.name,
        surname: trainer.surname,
      };
    else return;
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
  trainer?: TTrainerOutput;
};

type TTrainerOutput = {
  id: number;
  name: string;
  surname: string;
};

export default Get;
