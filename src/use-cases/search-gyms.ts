import { IGym, IGymsRepository } from "@/interfaces/gym";
import { IPagination } from "@/interfaces/pagination";

interface ISearchGymsUseCaseRequest {
  search: string;
  pagination: IPagination;
}

interface ISearchGymsUseCaseResponse {
  gyms: IGym[];
}
export class SearchGymsUseCase {
  constructor(private gymRepository: IGymsRepository) {}
  async execute({
    search,
    pagination,
  }: ISearchGymsUseCaseRequest): Promise<ISearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(search, pagination);
    return { gyms };
  }
}
