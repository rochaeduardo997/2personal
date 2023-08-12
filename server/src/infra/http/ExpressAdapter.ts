import IHttp from './IHttp';
import IToken from '../token/IToken';

import Express, { Request, Response, Router } from 'express';
import cors from 'cors'
import helmet from 'helmet'

class ExpressAdapter implements IHttp {
  readonly http;
  private router: Router;

  constructor(private token: IToken){
    this.http = Express();
    this.http.use(cors());
    this.http.use(helmet({ contentSecurityPolicy: false }));
    this.http.use(Express.json())
    this.http.use(Express.urlencoded({ extended: true}))

    this.http.use(async (req: Request, res: Response, next) => {
      const { authorization } = req.headers;
      const [ _, token ]      = authorization?.split(/\s/) || [];

      if(!token) {
        const result = 'Token must be provided';
        return res.status(401).send({ result });
      }

      const user = await this.token.verify(token);
      if(!user.status) return res.status(401).send({ result: `User ${user.name} ${user.surname} was disabled` });

      req.user = user;

      next();
    });

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

