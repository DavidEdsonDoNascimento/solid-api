import { ICheckIn, ICheckInsRepository } from "@/interfaces/check-in";
import { IPagination } from "@/interfaces/pagination";

interface FetchUserCheckInsHistoryRequest {
  userId: string;
  pagination: IPagination;
}

interface FetchUserCheckInsHistoryResponse {
  checkIns: ICheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    pagination,
  }: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      pagination
    );
    return { checkIns };
  }
}
