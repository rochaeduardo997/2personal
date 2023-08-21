import IHttp from '../../http/IHttp';
import IRequestAthleteRepository from '../../../domain/repository/IRequestAthleteRepository';
import IUserRepository from '../../../domain/repository/IUserRepository';
import Make from '../../../application/requestAthlete/Make';

class MakeAPI{
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private userRepository: IUserRepository,
    private requestAthleteRepository: IRequestAthleteRepository
  ){
    this.init();
  }

  private init(): void{
    this.http.addRoute('get', `/${this.routePrefix}/make/:athlete_id`, async (req: any) => {
      const { id } = req.user;
      const { athlete_id }     = req.params;

      const make = new Make(this.requestAthleteRepository, this.userRepository);

      try{
        const result = await make.execute({ 
          athlete_id: parseInt(athlete_id), 
          trainer_id: parseInt(id)
        });
        return { result,  code: 201 };
      }catch(err: any){
        return { result: err.message, code: 404 };
      }
    });
  }
}

export default MakeAPI;
