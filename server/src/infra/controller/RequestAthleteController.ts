import IHttp from '../http/IHttp';
import IUserRepository from '../../domain/repository/IUserRepository';
import IRequestAthleteRepository from '../../domain/repository/IRequestAthleteRepository';
import GetAllByAthleteAPI from './requestAthlete/GetAllByAthleteAPI';
import GetAllByTrainerAPI from './requestAthlete/GetAllByTrainerAPI';

class UserController{
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private userRepository: IUserRepository,
    private requestAthleteRepository: IRequestAthleteRepository
  ){
    new GetAllByAthleteAPI(routePrefix, http, requestAthleteRepository);
    new GetAllByTrainerAPI(routePrefix, http, requestAthleteRepository);
  }
}

export default UserController;

