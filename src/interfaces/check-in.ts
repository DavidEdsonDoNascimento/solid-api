import { IGym } from "./gym";
import { IPagination } from "./pagination";
import { IUser } from "./user";

interface ICheckIn {
  id?: string;
  created_at?: Date | null;
  validated_at?: Date | null;
  user?: IUser;
  gym?: IGym;
  user_id?: string;
  gym_id?: string;
}

interface ICheckInsRepository {
  create(data: ICheckIn): Promise<ICheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<ICheckIn | null>;
  findManyByUserId(
    userId: string,
    pagination: IPagination
  ): Promise<ICheckIn[]>;
  countByUserId(userId: string): Promise<number>;
}
export { ICheckIn, ICheckInsRepository };
