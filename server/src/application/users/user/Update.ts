import IUserRepository from "../../../domain/repository/IUserRepository";
import ICrypto from "../../../infra/crypto/ICrypto";

class Update{
  constructor(
    private userRepository: IUserRepository,
    private crypto: ICrypto
  ){}

  async execute(id: number, input: TInput): Promise<TOutput>{
    const userData = await this.userRepository.get(id);

    if(input.password) input.password = this.crypto.encrypt(input.password);

    userData.update(input);
    const result = await this.userRepository.update(userData);
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

type TInput = {
  name?:     string;
  surname?:  string;
  status?:   boolean;
  username?: string;
  password?: string;
  email?:    string;
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
};

export default Update;

