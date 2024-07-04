import { expect, describe, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    // creating a fictitious IUserRepository instance so that tests are not coupled to Prisma
    // consequently without using the database, testing only the functionality and focusing on what really matters,
    // which is ensuring that the functionality is doing what it should do
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },
      async create(data) {
        return {
          id: "user-1",
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
          checkins: [],
        };
      },
    });
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
});
