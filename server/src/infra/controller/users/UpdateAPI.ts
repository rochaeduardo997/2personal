import IHttp from '../../http/IHttp';
import ICrypto from '../../crypto/ICrypto';
import IUserRepository from '../../../domain/repository/IUserRepository';
import Update from '../../../application/user/Update';

class UpdateAPI {
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private userRepository: IUserRepository,
    private crypto: ICrypto
  ){
    this.init();
  }

  private init(){
    this.http.addRoute('put', `/${this.routePrefix}/:id`, async (req: any) => {
      const { id }   = req.params;
      const { body } = req;

      const update = new Update(this.userRepository, this.crypto);

      try{
        const result = await update.execute(+id, body);
        return { result,  code: 200 };
      }catch(err: any){
        return { result: err.message, code: 403 };
      }
    });
  }
}

export default UpdateAPI;
