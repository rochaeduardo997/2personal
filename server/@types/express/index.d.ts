export {};

declare global{
  namespace Express {
    interface Request {
      user: {
        id: number;
        name: string;
        surname: string;
        username: string;
        role: string;
        status: boolean;
      }
    }
  }
}

