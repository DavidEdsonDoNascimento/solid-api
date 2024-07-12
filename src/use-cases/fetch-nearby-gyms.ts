import { IGym, IGymsRepository } from "@/interfaces/gym";

interface IFetchNearbyGymsRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearbyGymsResponse {
  gyms: IGym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymsRequest): Promise<IFetchNearbyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
      distanceLimitInKm: 10,
    });
    return { gyms };
  }
}
