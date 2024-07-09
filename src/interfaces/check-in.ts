import { IGym } from "./gym";
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
}
export { ICheckIn, ICheckInsRepository };
