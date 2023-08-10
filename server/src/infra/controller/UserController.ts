import IHttp from '../http/IHttp';
import ICrypto from '../crypto/ICrypto';
import IUserRepository from '../../domain/repository/IUserRepository';
import GetAllAPI from './users/GetAllAPI';
import GetAPI from './users/GetAPI';
import AddAPI from './users/AddAPI';
import UpdateAPI from './users/UpdateAPI';
import DeleteAPI from './users/DeleteAPI';

class UserController{
  constructor(
    routePrefix: string, 
    http: IHttp, 
    userRepository: IUserRepository,
    crypto: ICrypto
  ){
    new GetAllAPI(routePrefix, http, userRepository);
    new GetAPI(routePrefix, http, userRepository);
    new AddAPI(routePrefix, http, userRepository, crypto);
    new UpdateAPI(routePrefix, http, userRepository, crypto);
    new DeleteAPI(routePrefix, http, userRepository);
  }
}

export default UserController;
