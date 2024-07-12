import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";
import { ICheckInsRepository } from "@/interfaces/check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

let checkInsRepository: ICheckInsRepository;
let sut: GetUserMetricsUseCase;
describe("Get user metrics use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });
  it("should be able to get check-ins count from metrics", async () => {
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

    const { checkInsCount } = await sut.execute({
      userId: "user-1",
    });
    expect(checkInsCount).toEqual(2);
  });
});
