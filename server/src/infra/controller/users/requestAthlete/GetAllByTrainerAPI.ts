import GetAllByTrainer from "../../../../application/requestAthlete/GetAllByTrainer";
import IRequestAthleteRepository from "../../../../domain/repository/IRequestAthleteRepository";
import IHttp from "../../../http/IHttp";

class GetAllByTrainerAPI{
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private requestAthleteRepository: IRequestAthleteRepository
  ){
    this.init();
  }

  private init(): void{
    this.http.addRoute('get', `/${this.routePrefix}/trainer`, async (req: any) => {
      const { id } = req.user;
      const getAllByTrainer = new GetAllByTrainer(this.requestAthleteRepository);

      try{
        const result = await getAllByTrainer.execute(parseInt(id));
        return { result,  code: 200 };
      }catch(err: any){
        return { result: err.message, code: 404 };
      }
    });
  }
}

export default GetAllByTrainerAPI;

