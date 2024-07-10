import { ICheckInsRepository } from "@/interfaces/check-in";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: ICheckInsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
    });

    console.log(checkIn.created_at);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    // This way I am ensuring that both records are being created on the same date
    vi.setSystemTime(new Date(2020, 0, 20, 7, 0, 0));

    await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-1",
        userId: "user-1",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    // This way I am ensuring that both records are being created on the same date
    vi.setSystemTime(new Date(2020, 0, 20, 7, 0, 0));

    await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
    });

    vi.setSystemTime(new Date(2020, 0, 21, 7, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
