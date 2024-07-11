import { ICheckInsRepository } from "@/interfaces/check-in";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: ICheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe("Fetch user check-ins history use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);
  });
  it("should be able to fetch user check-ins history", async () => {
    await checkInsRepository.create({
      user_id: "user-1",
      gym_id: "gym-1",
      created_at: new Date(),
    });

    await checkInsRepository.create({
      user_id: "user-1",
      gym_id: "gym-2",
      created_at: new Date(),
    });

    const { checkIns } = await sut.execute({
      userId: "user-1",
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym-1",
      }),
      expect.objectContaining({
        gym_id: "gym-2",
      }),
    ]);
  });

  it("should be able to fetch paginated check-ins history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: "user-1",
        gym_id: `gym-${i}`,
        created_at: new Date(),
      });
    }
    const { checkIns } = await sut.execute({
      userId: "user-1",
      pagination: {
        page: 2,
        maximumNumberOfItems: 20,
      },
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
