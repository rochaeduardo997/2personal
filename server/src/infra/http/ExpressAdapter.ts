import IHttp from './IHttp';
import Express, { Request, Response, Router } from 'express';
import cors from 'cors'
import helmet from 'helmet'

class ExpressAdapter implements IHttp {
  readonly http;
  private router: Router;

  constructor(){
    this.http = Express();
    this.http.use(cors());
    this.http.use(helmet({ contentSecurityPolicy: false }));

    this.router = Router();
  };

  addRoute(method: TMethods, url: string, callback: Function): void{
    this.router[method](url, async (req: Request, res: Response) => {
      const { result, code } = await callback(req);
      return res.status(code).json(result);
    });

    return;
  }

  setupRouters(): void{
    this.http.use('/api/', this.router);

    return;
  }

  async init(port: number): Promise<void>{
    await this.http.listen({ port });

    return;
  }
}

type TMethods = 'get'|'post'|'delete'|'put';

export default ExpressAdapter;

