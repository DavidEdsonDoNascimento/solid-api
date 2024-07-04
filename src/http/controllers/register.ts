import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { IUsersRepository } from "@/interfaces/user";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

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
    const usersRepository: IUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);
    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return response.status(409).send({
        message: err.message,
      });
    }
    throw err;
  }

  return response.status(201).send();
};
