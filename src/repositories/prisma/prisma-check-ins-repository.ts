import { ICheckIn, ICheckInsRepository } from "@/interfaces/check-in";
import { prisma } from "@/lib/prisma";

export class PrismCheckInsRepository implements ICheckInsRepository {
  async create(data: ICheckIn): Promise<ICheckIn> {
    const checkIn = await prisma.checkIn.create({
      data: {
        user_id: data.user_id || "",
        gym_id: data.gym_id || "",
      },
    });
    return checkIn;
  }
  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<ICheckIn | null> {
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: date,
      },
    });
    return checkIn || null;
  }
}
