import { IFindManyNearbyParams, IGym, IGymsRepository } from "@/interfaces/gym";
import { IPagination } from "@/interfaces/pagination";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements IGymsRepository {
  async create(data: IGym): Promise<IGym> {
    const gym = await prisma.gym.create({
      data,
    });

    return {
      ...gym,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  }

  async findById(id: string): Promise<IGym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym
      ? {
          ...gym,
          latitude: +gym.latitude,
          longitude: +gym.longitude,
        }
      : null;
  }
  async searchMany(search: string, pagination: IPagination): Promise<IGym[]> {
    const page = pagination?.page ?? 1;
    const maxNumberOfItems = pagination?.maximumNumberOfItems ?? 20;

    const gyms = await prisma.gym.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip: (page - 1) * maxNumberOfItems,
      take: maxNumberOfItems,
    });

    return gyms.map((gym) => ({
      ...gym,
      latitude: +gym.latitude,
      longitude: +gym.longitude,
    }));
  }
  async findManyNearby({
    latitude,
    longitude,
    distanceLimitInKm = 10,
  }: IFindManyNearbyParams): Promise<IGym[]> {
    const gyms = await prisma.$queryRaw<IGym[]>`
    SELECT * FROM gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${distanceLimitInKm}
    `;

    return gyms;
  }
}
