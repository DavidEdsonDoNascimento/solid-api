import { ICheckInsRepository } from "@/interfaces/check-in";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumbersCheckInsError } from "./errors/max-numbers-check-ins-error";

let checkInsRepository: ICheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-1",
      name: "Gym 1",
      description: "Gym 1 description",
      phone: "1234567890",
      latitude: -26.6374551,
      longitude: -48.6839573,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -26.6374551,
      userLongitude: -48.6839573,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    // This way I am ensuring that both records are being created on the same date
    vi.setSystemTime(new Date(2020, 0, 20, 7, 0, 0));

    await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -26.6374551,
      userLongitude: -48.6839573,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-1",
        userId: "user-1",
        userLatitude: -26.6374551,
        userLongitude: -48.6839573,
      })
    ).rejects.toBeInstanceOf(MaxNumbersCheckInsError);
  });

  it("should be able to check in twice but in different days", async () => {
    // This way I am ensuring that both records are being created on the same date
    vi.setSystemTime(new Date(2020, 0, 20, 7, 0, 0));

    await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -26.6374551,
      userLongitude: -48.6839573,
    });

    vi.setSystemTime(new Date(2020, 0, 21, 7, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-1",
      userId: "user-1",
      userLatitude: -26.6374551,
      userLongitude: -48.6839573,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distance gym", async () => {
    await expect(() =>
      sut.execute({
        gymId: "gym-1",
        userId: "user-1",
        userLatitude: -26.63846105293923,
        userLongitude: -48.69338651802824,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
