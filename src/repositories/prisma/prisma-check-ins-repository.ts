import { ICheckIn, ICheckInsRepository } from "@/interfaces/check-in";
import { IPagination } from "@/interfaces/pagination";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async update(data: ICheckIn): Promise<ICheckIn> {
    return await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data: {
        validated_at: data.validated_at,
      },
    });
  }
  async findById(id: string): Promise<ICheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }
  async countByUserId(userId: string): Promise<number> {
    return await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
  }

  async findManyByUserId(
    userId: string,
    pagination: IPagination
  ): Promise<Array<ICheckIn>> {
    const page = pagination?.page ?? 1;
    const maxNumberOfItems = pagination?.maximumNumberOfItems ?? 10;

    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      skip: (page - 1) * maxNumberOfItems,
      take: maxNumberOfItems,
    });

    return checkIns ?? null;
  }
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
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }
}
