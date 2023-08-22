import Trainer from "../../../domain/entity/users/Trainer";
import IUserRepository from "../../../domain/repository/users/IUserRepository";
import ICrypto from "../../../infra/crypto/ICrypto";

class Update{
  constructor(
    private userRepository: IUserRepository,
    private crypto: ICrypto
  ){}

  async execute(id: number, input: TInput): Promise<TOutput>{
    const trainerData = await this.userRepository.get(id) as Trainer;

    if(input.password) input.password = this.crypto.encrypt(input.password);

    trainerData.update(input);
    const result = await this.userRepository.update(trainerData);

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
      register: result.register,
      plan: result.plan,
      athletes_limit: result.athletes_limit
    };
  }
}

type TInput = {
  name?:           string;
  surname?:        string;
  status?:         boolean;
  username?:       string;
  password?:       string;
  email?:          string;
  register?:       string;
  plan?:           string;
  athletes_limit?: number;
};

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
  register:       string;
  plan:           string;
  athletes_limit: number;
};

export default Update;

