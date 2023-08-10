import * as dotenv from 'dotenv';

import ICrypto from '../../../src/infra/crypto/ICrypto';
import CryptoAdapter from '../../../src/infra/crypto/CryptoAdapter';

dotenv.config();

let crypto: ICrypto;

const expectedString = '0526e9126664018ec19419ec9de3dfffd941e127604863fd11ea6125cb0bcee58c6293ed0dffae1320276cc1063d6a5392b85e7a6eabf603fda0e67b52a7be95';

beforeAll(() => {
  crypto = new CryptoAdapter();
});

describe('Successful cases', () => {
  test('Encrypt string', async () => {
    const encryptedString = await crypto.encrypt('validate');
    expect(encryptedString).toBe(expectedString);
  });
  test('Verify string', async () => {
    const result = await crypto.verify('validate', expectedString);
    expect(result).toBeTruthy();
  });
});

describe('Failure cases', () => {
  test('Fail on verify string', async () => {
    const result = await crypto.verify('failed', expectedString);
    expect(result).toBeFalsy();
  });
});

