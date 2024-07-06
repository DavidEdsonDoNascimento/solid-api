import { IUser } from "./user";

interface IAuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface IAuthenticateUseCaseResponse {
  user: IUser;
}

export { IAuthenticateUseCaseRequest, IAuthenticateUseCaseResponse };
