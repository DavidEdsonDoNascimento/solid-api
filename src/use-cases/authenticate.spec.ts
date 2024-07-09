import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { IUsersRepository } from "@/interfaces/user";

let usersRepository: IUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    // Be careful not to use another use case when testing a use case
    // as this violates the design pattern
    // That's why RegisterUseCase.execute was not called but IUserRepository.create,
    // so as not to run the risk of testing more than one use case
    usersRepository = new InMemoryUsersRepository();
    // system under test S.U.T | global default generic variable
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash("password123", 6),
    });

    const { user } = await sut.execute({
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "john.doe@example.com",
        password: "password123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash("password123", 6),
    });

    await expect(() =>
      sut.execute({
        email: "john.doe@example.com",
        password: "password1234",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
