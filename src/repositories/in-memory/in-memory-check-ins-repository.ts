import { ICheckIn, ICheckInsRepository } from "@/interfaces/check-in";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  private checkIns: ICheckIn[] = [];
  async create(data: ICheckIn): Promise<ICheckIn> {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
