import { ICheckIn, ICheckInsRepository } from "@/interfaces/check-in";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  private checkIns: ICheckIn[] = [];

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<ICheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInsOnDay = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);

      const isOnSameDay =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDay;
    });

    return checkInsOnDay || null;
  }

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
