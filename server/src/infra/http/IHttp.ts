interface IHttp {
  http: any;
  addRoute(method: any, url: string, callback: Function): void;
  setupRouters(): void;
  init(port: number): Promise<void>;
}

export default IHttp;
