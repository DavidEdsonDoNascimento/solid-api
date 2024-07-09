import { IUser, IUsersRepository } from "@/interfaces/user";

class InMemoryUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  async findById(id: string): Promise<IUser | null> {
    const user = this.users.find((item) => item.id === id);
    return !user ? null : user;
  }

  async create(data: IUser): Promise<IUser> {
    const user: IUser = {
      ...data,
      id: "user-1",
      created_at: new Date(),
      checkins: [],
    };

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find((item) => item.email === email);
    return !user ? null : user;
  }
}

export { InMemoryUsersRepository };
