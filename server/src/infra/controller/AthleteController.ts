import IHttp from '../http/IHttp';
import ICrypto from '../crypto/ICrypto';
import IUserRepository from '../../domain/repository/IUserRepository';
import GetAPI from './athletes/GetAPI';
import GetAllAPI from './athletes/GetAllAPI';
import AddAPI from './athletes/AddAPI';
import UpdateAPI from './athletes/UpdateAPI';

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

