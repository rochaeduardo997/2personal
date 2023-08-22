import IHttp from '../http/IHttp';
import IUserRepository from '../../domain/repository/IUserRepository';
import IRequestAthleteRepository from '../../domain/repository/IRequestAthleteRepository';
import GetAllByAthleteAPI from './users/requestAthlete/GetAllByAthleteAPI';
import GetAllByTrainerAPI from './users/requestAthlete/GetAllByTrainerAPI';
import HandleAPI from './users/requestAthlete/HandleAPI';
import MakeAPI from './users/requestAthlete/MakeAPI';

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

