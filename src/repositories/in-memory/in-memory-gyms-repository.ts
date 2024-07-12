import { IFindManyNearbyParams, IGym, IGymsRepository } from "@/interfaces/gym";
import { IPagination } from "@/interfaces/pagination";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements IGymsRepository {
  private gyms: IGym[] = [];

  async findManyNearby(params: IFindManyNearbyParams): Promise<IGym[]> {
    const { latitude, longitude, distanceLimitInKm } = params;

    const gyms = this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: latitude,
          longitude: longitude,
        },
        {
          latitude: gym.latitude,
          longitude: gym.longitude,
        }
      );

      return distance < distanceLimitInKm;
    });

    return gyms;
  }

  async searchMany(search: string, pagination: IPagination): Promise<IGym[]> {
    const page = pagination?.page ?? 1;
    const maxNumberItems = pagination?.maximumNumberOfItems ?? 20;

    const gyms = this.gyms
      .filter((gym) => gym.name.includes(search))
      .slice((page - 1) * maxNumberItems, page * maxNumberItems);

    return gyms;
  }

  async create(data: IGym): Promise<IGym> {
    const gym = {
      ...data,
      id: data.id ?? randomUUID(),
    };
    this.gyms.push(gym);
    return gym;
  }

  async findById(id: string): Promise<IGym | null> {
    const gym = this.gyms.find((gym) => gym.id === id);
    return gym ? gym : null;
  }
}
