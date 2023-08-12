import JWTAdapter from '../../../src/infra/token/JWTAdapter';
import IToken from '../../../src/infra/token/IToken';
import * as dotenv from 'dotenv';
dotenv.config();

const token: IToken = new JWTAdapter();

describe('Successful tests', () => {
  test('Generate token', async () => {
    const result = await token.generate({ test: 1234 });
    expect(result).toHaveLength(121);
  });

  test('Generate token with expiration time', async () => {
    const result = await token.generate({ test: 1234 }, 864e5);
    expect(result).toHaveLength(144);
  });

  test('Validate token', async () => {
    const tokenResult  = await token.generate({ test: 1234 });
    const verifyResult = await token.verify(tokenResult);
    expect(verifyResult.test).toEqual(1234);
  });

  test('Validate token with expiration date', async () => {
    const tokenResult  = await token.generate({ test: 1234 }, 864e5);
    const verifyResult = await token.verify(tokenResult);
    expect(verifyResult.test).toEqual(1234);
  });
});

