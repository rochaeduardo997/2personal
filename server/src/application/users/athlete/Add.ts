import Athlete from "../../../domain/entity/users/Athlete";
import IUserRepository from "../../../domain/repository/users/IUserRepository";
import ICrypto from "../../../infra/crypto/ICrypto";

class Add{
  constructor(
    private userRepository: IUserRepository,
    private crypto: ICrypto
  ){}

  async execute(input: TInput): Promise<TOutput>{
    if(!input.password) throw new Error('Password must be provided.');

    const encryptedPassword = this.crypto.encrypt(input.password);

    const user = new Athlete(1, input.name, input.surname, input.username, encryptedPassword, input.email, true);

    const result = await this.userRepository.save(user) as Athlete;

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
      trainer: undefined
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
  trainer: undefined;
};

type TInput = {
  name: string;
  surname: string;
  username: string;
  role: string;
  password: string;
  email: string;
};

export default Add;

