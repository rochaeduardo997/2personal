import Get from "../../../../application/users/athlete/Get";
import IUserRepository from "../../../../domain/repository/users/IUserRepository";
import IHttp from "../../../http/IHttp";

class GetAPI {
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private userRepository: IUserRepository
  ){
    this.init();
  }

  private init(){
    this.http.addRoute('get', `/${this.routePrefix}/:id`, async (req: any) => {
      const { id } = req.params;
      const get = new Get(this.userRepository);

      try{
        const result = await get.execute(parseInt(id));
        return { result,  code: 200 };
      }catch(err: any){
        return { result: err.message, code: 404 };
      }
    });
  }
}

export default GetAPI;

