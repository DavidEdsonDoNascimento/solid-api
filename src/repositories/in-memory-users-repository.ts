import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { IUser, IUsersRepository } from "@/interfaces/user";

export class InMemoryUsersRepository implements IUsersRepository {
  private users: IUser[] = [];
  async create(data: Prisma.UserCreateInput): Promise<IUser> {
    this.users.push(data as IUser);
    return this.users[this.users.length - 1];
  }
}
