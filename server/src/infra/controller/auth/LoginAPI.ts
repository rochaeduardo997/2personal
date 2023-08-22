import IHttp from '../../http/IHttp';
import ICrypto from '../../crypto/ICrypto';
import IToken from '../../token/IToken';
import IUserRepository from '../../../domain/repository/users/IUserRepository';
import Login from '../../../application/auth/Login';

class LoginAPI{
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private userRepository: IUserRepository,
    private token: IToken,
    private crypto: ICrypto
  ){
    this.init();
  }

  private init(){
    this.http.addRoute('post', `/${this.routePrefix}/`, async (req: any) => {
      const { body } = req;
      const login = new Login(this.token, this.crypto, this.userRepository);

      try{
        const result = await login.execute(body);
        return { result,  code: 200 };
      }catch(err: any){
        return { result: err.message, code: 401 };
      }
    });
  }
}

export default LoginAPI;

