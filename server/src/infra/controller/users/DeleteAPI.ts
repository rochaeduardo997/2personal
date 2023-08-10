import IHttp from '../../http/IHttp';
import IUserRepository from '../../../domain/repository/IUserRepository';
import Delete from '../../../application/user/Delete';

class DeleteAPI{
  constructor(
    private routePrefix: string, 
    private http: IHttp, 
    private userRepository: IUserRepository
  ){
    this.init();
  }

  private init(){
    this.http.addRoute('delete', `/${this.routePrefix}/:id`, async (req: any) => {
      const { id } = req.params;
      const remove = new Delete(this.userRepository);

      try{
        const result = await remove.execute(+id);
        return { result,  code: 200 };
      }catch(err: any){
        return { result: err.message, code: 403 };
      }
    });
  }
}

export default DeleteAPI;

