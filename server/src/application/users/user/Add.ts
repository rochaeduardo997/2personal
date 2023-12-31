import User from '../../../domain/entity/users/User';
import IUserRepository from '../../../domain/repository/users/IUserRepository';
import ICrypto from '../../../infra/crypto/ICrypto';

class Add{
  constructor(
    private userRepository: IUserRepository,
    private crypto: ICrypto
  ){}

  async execute(input: TInput): Promise<TOutput>{
    if(!input.password) throw new Error('Password must be provided.');

    const encryptedPassword = this.crypto.encrypt(input.password);

    const user = new User(1, input.name, input.surname, input.username, encryptedPassword, input.role, input.email, true);

    const result = await this.userRepository.save(user);
    return {
      id: result.id,
      name: result.name,
      surname: result.surname,
      username: result.username,
      role: result.role,
      email: result.email,
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
  email: string;
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
  email: string;
};

export default Add;

