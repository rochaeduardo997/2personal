import IToken from './IToken';
import jwt from 'jsonwebtoken';

class JWTAdapter implements IToken{
  private JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

  constructor(){}

  async generate(data: TTokenPayload, exp?: number): Promise<string>{
    if(!this.JWT_PRIVATE_KEY) throw new Error('JWT_PRIVATE_KEY must be declared on environment');

    const result = exp ?
      await jwt.sign(data, this.JWT_PRIVATE_KEY, { expiresIn: exp }) :
      await jwt.sign(data, this.JWT_PRIVATE_KEY);
    return result;
  }

  async verify(token: string): Promise<any>{
    if(!this.JWT_PRIVATE_KEY) throw new Error('JWT_PRIVATE_KEY must be declared on environment');

    const result = await jwt.verify(token, this.JWT_PRIVATE_KEY);
    return result;
  }
}

type TTokenPayload = { data: object, exp?: number };

export default JWTAdapter;

