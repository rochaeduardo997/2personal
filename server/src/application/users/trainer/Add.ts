import Trainer from "../../../domain/entity/users/Trainer";
import IUserRepository from "../../../domain/repository/users/IUserRepository";
import ICrypto from "../../../infra/crypto/ICrypto";

class Add {
  constructor(
    private userRepository: IUserRepository, 
    private crypto: ICrypto
  ){}

  async execute(input: TInput): Promise<TOutput>{
    if(!input.password) throw new Error('Password must be provided.');

    const encryptedPassword = this.crypto.encrypt(input.password);

    const trainer = new Trainer(
      1, 
      input.name, 
      input.surname, 
      input.username, 
      encryptedPassword, 
      input.register, 
      input.email, 
      true
    );

    const result = await this.userRepository.save(trainer) as Trainer;

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
  register: string;
  plan: string;
  athletes_limit: number;
};

type TInput = {
  name: string;
  surname: string;
  username: string;
  role: string;
  password: string;
  email: string;
  register: string;
};

export default Add;

