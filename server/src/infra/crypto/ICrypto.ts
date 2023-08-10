interface ICrypto{
  encrypt(value: string): string;
  verify(value: string, encryptedString: string): boolean;
}

export default ICrypto;

