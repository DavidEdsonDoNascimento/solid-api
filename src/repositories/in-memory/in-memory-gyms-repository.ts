import { IGym, IGymsRepository } from "@/interfaces/gym";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: IGym[] = [];

  async create(data: IGym): Promise<IGym> {
    const gym = {
      ...data,
      id: randomUUID(),
    };
    this.gyms.push(gym);
    return gym;
  }

  async findById(id: string): Promise<IGym | null> {
    const gym = this.gyms.find((gym) => gym.id === id);
    return gym ? gym : null;
  }
}
