import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym";

export const makeCreateGymUseCase = () => {
  const gymRepository = new PrismaGymsRepository();
  const createGymUseCase = new CreateGymUseCase(gymRepository);
  return createGymUseCase;
};
