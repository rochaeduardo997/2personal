import JWTAdapter from '../../../src/infra/token/JWTAdapter';
import Token from '../../../src/infra/token/Token';
import * as dotenv from 'dotenv';
dotenv.config();

const token: Token = new JWTAdapter();

describe('Successful tests', () => {
  test('Generate token', async () => {
    const result = await token.generate({ test: 1234 });
    expect(result).toHaveLength(133);
  });

  test('Generate token with expiration time', async () => {
    const result = await token.generate({ test: 1234 }, 864e5);
    expect(result).toHaveLength(153);
  });
});

