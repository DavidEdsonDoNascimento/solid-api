import { ICheckIn, ICheckInsRepository } from "@/interfaces/check-in";

interface ICheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface ICheckInUseCaseResponse {
  checkIn: ICheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
