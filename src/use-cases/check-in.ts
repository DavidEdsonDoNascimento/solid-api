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
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
