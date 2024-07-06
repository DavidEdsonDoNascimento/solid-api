import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    // creating a fictitious IUserRepository instance so that tests are not coupled to Prisma
    // consequently without using the database, testing only the functionality and focusing on what really matters,
    // which is ensuring that the functionality is doing what it should do
    const userRepository = new InMemoryUsersRepository();

    const registerUseCase = new RegisterUseCase(userRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    const isPasswordCorrectlyHashed = await compare(
      "password123",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    // creating a fictitious IUserRepository instance so that tests are not coupled to Prisma
    // consequently without using the database, testing only the functionality and focusing on what really matters,
    // which is ensuring that the functionality is doing what it should do
    const userRepository = new InMemoryUsersRepository();

    const registerUseCase = new RegisterUseCase(userRepository);

    const email = "john.doe@example.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "password123",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "password123",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
