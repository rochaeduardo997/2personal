import GetAll from "../../../../application/users/user/GetAll";
import IUserRepository from "../../../../domain/repository/IUserRepository";
import IHttp from "../../../http/IHttp";

class GetAllAPI{
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private userRepository: IUserRepository
  ){
    this.init();
  }

  private init(){
    this.http.addRoute('get', `/${this.routePrefix}/`, async (req: any) => {
      const getAll = new GetAll(this.userRepository);

      try{
        const result = await getAll.execute() || [];
        return { result,  code: 200 };
      }catch(err: any){
        return { result: err.message, code: 403 };
      }
    });
  }
}

export default GetAllAPI;
