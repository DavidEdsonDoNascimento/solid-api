import { expect, describe, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    // Be careful not to use another use case when testing a use case
    // as this violates the design pattern
    // That's why RegisterUseCase.execute was not called but IUserRepository.create,
    // so as not to run the risk of testing more than one use case
    const usersRepository = new InMemoryUsersRepository();
    usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash("password123", 6),
    });

    // system under test S.U.T | global default generic variable
    const sut = new AuthenticateUseCase(usersRepository);

    const { user } = await sut.execute({
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();

    // system under test S.U.T | global default generic variable
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "john.doe@example.com",
        password: "password123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    // Be careful not to use another use case when testing a use case
    // as this violates the design pattern
    // That's why RegisterUseCase.execute was not called but IUserRepository.create,
    // so as not to run the risk of testing more than one use case
    const usersRepository = new InMemoryUsersRepository();
    usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash("password123", 6),
    });

    // system under test S.U.T | global default generic variable
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "john.doe@example.com",
        password: "password1234",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
