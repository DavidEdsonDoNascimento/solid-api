import { IUsersRepository } from "@/interfaces/user";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: IUsersRepository;
let sut: GetUserProfileUseCase;
describe("Get user profile use case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "password123",
    });

    const { user } = await sut.execute({ userId: createdUser.id || "" });

    expect(createdUser.id).toEqual(user.id);
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
