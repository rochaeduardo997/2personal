import IHttp from '../http/IHttp';
import ICrypto from '../crypto/ICrypto';
import IUserRepository from '../../domain/repository/users/IUserRepository';
import AddAPI from './users/athletes/AddAPI';
import GetAPI from './users/athletes/GetAPI';
import GetAllAPI from './users/athletes/GetAllAPI';
import UpdateAPI from './users/athletes/UpdateAPI';

class AthleteController{
  constructor(
    routePrefix: string, 
    http: IHttp, 
    userRepository: IUserRepository,
    crypto: ICrypto
  ){
    new GetAPI(routePrefix, http, userRepository);
    new GetAllAPI(routePrefix, http, userRepository);
    new AddAPI(routePrefix, http, userRepository, crypto);
    new UpdateAPI(routePrefix, http, userRepository, crypto);
  }
}

export default AthleteController;

