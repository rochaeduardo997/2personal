import IHttp from '../http/IHttp';
import ICrypto from '../crypto/ICrypto';
import IUserRepository from '../../domain/repository/users/IUserRepository';
import AddAPI from './users/user/AddAPI';
import DeleteAPI from './users/user/DeleteAPI';
import GetAPI from './users/user/GetAPI';
import GetAllAPI from './users/user/GetAllAPI';
import UpdateAPI from './users/user/UpdateAPI';

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
