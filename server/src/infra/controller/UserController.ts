import IHttp from '../http/IHttp';
import IUserRepository from '../../domain/repository/IUserRepository';
import GetAllAPI from './users/GetAllAPI';
import GetAPI from './users/GetAPI';
import AddAPI from './users/AddAPI';
import UpdateAPI from './users/UpdateAPI';
import DeleteAPI from './users/DeleteAPI';

class UserController{
  constructor(routePrefix: string, http: IHttp, userRepository: IUserRepository){
    new GetAllAPI(routePrefix, http, userRepository);
    new GetAPI(routePrefix, http, userRepository);
    new AddAPI(routePrefix, http, userRepository);
    new UpdateAPI(routePrefix, http, userRepository);
    new DeleteAPI(routePrefix, http, userRepository);
  }
}

export default UserController;
