import {
  IUsersRepository,
  RegisterUseCaseRequest,
  RegisterUseCaseResponse,
} from "@/interfaces/user";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

// the use case is input and output model agnostic
// D - Dependency Inversion Principle
export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    // number of rounds that the encryption was done in addition to the one generated previously
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
