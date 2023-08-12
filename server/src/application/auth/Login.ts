import IToken from '../../infra/token/IToken';
import ICrypto from '../../infra/crypto/ICrypto';
import IUserRepository, { TInput } from '../../domain/repository/IUserRepository';

class Login {
  constructor(
    private token: IToken,
    private crypto: ICrypto,
    private userRepository: IUserRepository
  ){}

  async execute(input: TInput, expireIn?: number): Promise<string>{
    input.password = this.crypto.encrypt(input.password);

    const user = await this.userRepository.login(input);

    const tokenData = {
      id:       user.id,
      name:     user.name,
      surname:  user.surname,
      username: user.username,
      role:     user.role,
      email:    user.email,
      status:   user.status
    };

    const result = await this.token.generate(tokenData, expireIn);

    return result;
  }
}

export default Login;

