import { IUser } from "./user";

interface IGetUserProfileUseCaseRequest {
  userId: string;
}
interface IGetUserProfileUseCaseResponse {
  user: IUser;
}

export { IGetUserProfileUseCaseRequest, IGetUserProfileUseCaseResponse };
