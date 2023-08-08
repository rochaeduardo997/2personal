import IHttp from '../http/IHttp';
import IUserRepository from '../../domain/repository/IUserRepository';
import GetAllAPI from './users/GetAllAPI';

class UserController{
  constructor(routePrefix: string, http: IHttp, userRepository: IUserRepository){
    new GetAllAPI(routePrefix, http, userRepository);
  }
}

export default UserController;
