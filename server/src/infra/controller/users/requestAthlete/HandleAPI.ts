import Handle from "../../../../application/requestAthlete/Handle";
import IRequestAthleteRepository from "../../../../domain/repository/IRequestAthleteRepository";
import IHttp from "../../../http/IHttp";

class HandleAPI{
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private requestAthleteRepository: IRequestAthleteRepository
  ){
    this.init();
  }

  private init(): void{
    this.http.addRoute('put', `/${this.routePrefix}/handle/:id`, async (req: any) => {
      const { id: athlete_id }       = req.user;
      const { id }                   = req.params;
      const { was_accepted = false } = req.body;

      const handle = new Handle(this.requestAthleteRepository);

      try{
        const input = {
          id:         +id,
          athlete_id: +athlete_id,
          was_accepted
        };
        const result = await handle.execute(input);
        return { result,  code: 200 };
      }catch(err: any){
        return { result: err.message, code: 404 };
      }
    });
  }
}

export default HandleAPI;

