import IHttp from '../../../http/IHttp';
import IRequestAthleteRepository from '../../../../domain/repository/IRequestAthleteRepository';
import GetAllByAthlete from '../../../../application/users/requestAthlete/GetAllByAthlete';

class GetAllByAthleteAPI{
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private requestAthleteRepository: IRequestAthleteRepository
  ){
    this.init();
  }

  private init(): void{
    this.http.addRoute('get', `/${this.routePrefix}/athlete`, async (req: any) => {
      const { id } = req.user;
      const getAllByAthlete = new GetAllByAthlete(this.requestAthleteRepository);

      try{
        const result = await getAllByAthlete.execute(parseInt(id));
        return { result,  code: 200 };
      }catch(err: any){
        return { result: err.message, code: 404 };
      }
    });
  }
}

export default GetAllByAthleteAPI;

