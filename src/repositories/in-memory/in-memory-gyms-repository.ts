import { IGym, IGymsRepository } from "@/interfaces/gym";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements IGymsRepository {
  private gyms: IGym[] = [];

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
