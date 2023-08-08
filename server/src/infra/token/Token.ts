interface Token{
  generate(data: any, exp?: number): Promise<string>;
}

export default Token;
