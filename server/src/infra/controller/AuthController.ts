import IHttp from '../http/IHttp';
import ICrypto from '../crypto/ICrypto';
import IToken from '../token/IToken';
import IUserRepository from '../../domain/repository/IUserRepository';
import LoginAPI from './auth/LoginAPI';

class AuthController{
  constructor(
    routePrefix: string, 
    http: IHttp, 
    userRepository: IUserRepository,
    token: IToken,
    crypto: ICrypto
  ){
    new LoginAPI(routePrefix, http, userRepository, token, crypto);
  }
}

export default AuthController;
