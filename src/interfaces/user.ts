interface IUser {
  id?: string;
  name: string;
  email: string;
  password_hash: string;
  created_at?: Date;
  checkins?: any[];
}

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface IUsersRepository {
  create(data: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}

interface RegisterUseCaseResponse {
  user: IUser;
}

export {
  IUser,
  RegisterUseCaseRequest,
  IUsersRepository,
  RegisterUseCaseResponse,
};
