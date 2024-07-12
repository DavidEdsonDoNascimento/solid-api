import { ICheckInsRepository } from "@/interfaces/check-in";
import { beforeEach, describe, expect, it } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: ICheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate check in use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
  });

  it("should be able to validate a user's check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      user_id: "user-1",
      gym_id: "gym-1",
      created_at: new Date(),
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id || "",
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "check-in-id-no-exists",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
