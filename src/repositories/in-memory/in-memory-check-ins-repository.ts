import { ICheckIn, ICheckInsRepository } from "@/interfaces/check-in";
import { IPagination } from "@/interfaces/pagination";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  private checkIns: ICheckIn[] = [];

  async update(data: ICheckIn): Promise<ICheckIn> {
    const checkInIndex = this.checkIns.findIndex(
      (checkIn) => checkIn.id === data.id
    );

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = data;
    }

    return data;
  }

  async findById(id: string): Promise<ICheckIn | null> {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === id);
    return checkIn ?? null;
  }

  async countByUserId(userId: string): Promise<number> {
    const checkIns = this.checkIns.filter(
      (checkIn) => checkIn.user_id === userId
    );
    return checkIns.length;
  }

  async findManyByUserId(
    userId: string,
    pagination: IPagination
  ): Promise<ICheckIn[]> {
    const page = pagination?.page ?? 1;
    const maxNumberItems = pagination?.maximumNumberOfItems ?? 10;

    const checkIns = this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * maxNumberItems, page * maxNumberItems);
    return checkIns ?? null;
  }

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
