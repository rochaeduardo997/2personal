import JWTAdapter from '../../src/infra/token/JWTAdapter';
import User from '../../src/domain/entity/User';

import * as dotenv from 'dotenv';

dotenv.config();

const token = new JWTAdapter();

function generateToken(user: User, expiresIn?: number){
  const input = {
    id:       user.id,
    name:     user.name,
    surname:  user.surname,
    username: user.username,
    role:     user.role,
    email:    user.email,
    status:   user.status
  };

  const result = token.generate(input, expiresIn);

  return result;
}

export { generateToken };

