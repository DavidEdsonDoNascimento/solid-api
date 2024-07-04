import { IUsersRepository, RegisterUseCaseRequest } from "@/interfaces/user";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

// the use case is input and output model agnostic
// D - Dependency Inversion Principle
export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    // number of rounds that the encryption was done in addition to the one generated previously
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error("Email already in use");
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
