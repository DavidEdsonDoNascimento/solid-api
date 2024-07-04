export interface IUser {
  id?: string;
  name: string;
  email: string;
  password_hash: string;
  created_at?: Date;
  checkins?: any[];
}

export interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUsersRepository {
  create(data: IUser): Promise<IUser>;
}
