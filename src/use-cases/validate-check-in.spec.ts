import { ICheckInsRepository } from "@/interfaces/check-in";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

let checkInsRepository: ICheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate check in use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate a user's check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      user_id: "user-1",
      gym_id: "gym-1",
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

  it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      user_id: "user-1",
      gym_id: "gym-1",
    });

    const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21; // ms * s * minutes of rules business
    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id || "",
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
