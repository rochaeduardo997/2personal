import IHttp from '../../../http/IHttp';
import ICrypto from '../../../crypto/ICrypto';
import IUserRepository from '../../../../domain/repository/IUserRepository';
import Add from '../../../../application/user/Add';

class AddAPI{
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private userRepository: IUserRepository,
    private crypto: ICrypto
  ){
    this.init();
  }

  private init(){
    this.http.addRoute('post', `/auth/${this.routePrefix}`, async (req: any) => {
      const { body } = req;
      const add = new Add(this.userRepository, this.crypto);

      try{
        const result = await add.execute(body);
        return { result,  code: 201 };
      }catch(err: any){
        return { result: err.message, code: 403 };
      }
    });
  }
}

export default AddAPI;

