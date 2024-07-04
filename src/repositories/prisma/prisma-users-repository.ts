import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IUser, IUsersRepository } from "@/interfaces/user";

export class PrismaUsersRepository implements IUsersRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<IUser> {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}