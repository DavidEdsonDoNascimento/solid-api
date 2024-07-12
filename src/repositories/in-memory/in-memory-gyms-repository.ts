import { IGym, IGymsRepository } from "@/interfaces/gym";
import { IPagination } from "@/interfaces/pagination";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements IGymsRepository {
  private gyms: IGym[] = [];

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
