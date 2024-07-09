import {
  IGetUserProfileUseCaseRequest,
  IGetUserProfileUseCaseResponse,
} from "@/interfaces/user-profile";
import { IUsersRepository } from "@/interfaces/user";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
