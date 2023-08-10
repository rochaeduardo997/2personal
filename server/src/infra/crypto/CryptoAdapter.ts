import ICrypto from './ICrypto';
import crypto  from 'crypto';

class CryptoAdapter implements ICrypto{
  private CRYPTO_KEY    = process.env.CRYPTO_KEY;
  private CRYPTO_SALT   = process.env.CRYPTO_SALT;
  private CRYPTO_DIGEST = process.env.CRYPTO_DIGEST;

  encrypt(value: string): string{
    if(!this.CRYPTO_KEY)    throw new Error('Crypto key must be provided.');
    if(!this.CRYPTO_SALT)   throw new Error('Crypto salt must be provided.');
    if(!this.CRYPTO_DIGEST) throw new Error('Crypto digest must be provided.');

    const result = crypto.pbkdf2Sync(
      value, 
      this.CRYPTO_KEY, 
      +this.CRYPTO_SALT, 
      64, 
      this.CRYPTO_DIGEST
    );

    return result.toString('hex');
  }

  verify(value: string, encryptedString: string): boolean{
    const result = this.encrypt(value);
    const isSame = result === encryptedString;
    if(isSame) return true;
    else       return false;
  }
}

export default CryptoAdapter;

