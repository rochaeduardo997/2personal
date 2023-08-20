import IHttp from '../http/IHttp';
import IUserRepository from '../../domain/repository/IUserRepository';
import IRequestAthleteRepository from '../../domain/repository/IRequestAthleteRepository';
import GetAllByAthleteAPI from './requestAthlete/GetAllByAthleteAPI';
import GetAllByTrainerAPI from './requestAthlete/GetAllByTrainerAPI';
import MakeAPI from './requestAthlete/MakeAPI';
import HandleAPI from './requestAthlete/HandleAPI';

class UserController{
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private userRepository: IUserRepository,
    private requestAthleteRepository: IRequestAthleteRepository
  ){
    new GetAllByAthleteAPI(routePrefix, http, requestAthleteRepository);
    new GetAllByTrainerAPI(routePrefix, http, requestAthleteRepository);
    new MakeAPI(routePrefix, http, userRepository, requestAthleteRepository);
    new HandleAPI(routePrefix, http, requestAthleteRepository);
  }
}

export default UserController;

