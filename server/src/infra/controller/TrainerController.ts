import IHttp from '../http/IHttp';
import ICrypto from '../crypto/ICrypto';
import IUserRepository from '../../domain/repository/IUserRepository';
import GetAPI from './trainers/GetAPI';
import GetAllAPI from './trainers/GetAllAPI';
import AddAPI from './trainers/AddAPI';
import UpdateAPI from './trainers/UpdateAPI';

class TrainerController{
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

export default TrainerController;

