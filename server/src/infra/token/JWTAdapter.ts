import Token from './Token';
import jwt from 'jsonwebtoken';

class JWTAdapter implements Token{
  private JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

  constructor(){}

  async generate(data: any, exp?: number): Promise<string>{
    if(!this.JWT_PRIVATE_KEY) throw new Error('JWT_PRIVATE_KEY must be declared on environment');

    const tokenPayload: TTokenPayload = { data };
    exp ? tokenPayload.exp = exp : undefined;

    const result = jwt.sign(tokenPayload, this.JWT_PRIVATE_KEY);
    return result;
  }
}

type TTokenPayload = { data: object, exp?: number };

export default JWTAdapter;

