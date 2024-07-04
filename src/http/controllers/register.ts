import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { IUsersRepository } from "@/interfaces/user";
import { InMemoryUsersRepository } from "@/repositories/in-memory-users-repository";

export const register = async (
  request: FastifyRequest,
  response: FastifyReply
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository: IUsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    return response.status(409).send({ message: "Email already in use" });
  }

  return response.status(201).send();
};
