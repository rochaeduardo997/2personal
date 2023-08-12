interface IToken{
  generate(data: object, exp?: number): Promise<string>;
  verify(token: string): Promise<any>;
}

export default IToken;

