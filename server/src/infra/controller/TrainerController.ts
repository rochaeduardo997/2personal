import IHttp from '../http/IHttp';
import ICrypto from '../crypto/ICrypto';
import IUserRepository from '../../domain/repository/users/IUserRepository';
import GetAPI from './users/trainers/GetAPI';
import GetAllAPI from './users/trainers/GetAllAPI';
import AddAPI from './users/trainers/AddAPI';
import UpdateAPI from './users/trainers/UpdateAPI';

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

