import { IPagination } from "./pagination";

interface IGym {
  id?: string;
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface IGymsRepository {
  create(data: IGym): Promise<IGym>;
  findById(id: string): Promise<IGym | null>;
  searchMany(search: string, pagination: IPagination): Promise<IGym[]>;
}

export { IGym, IGymsRepository };
