import { IGymsRepository } from "@/interfaces/gym";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: IGymsRepository;
let sut: SearchGymsUseCase;

describe("Search gyms use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 8; i++) {
      await gymsRepository.create({
        name: `Sample Gym ${i}`,
        description: "Gym 1 description",
        phone: "1234567890",
        latitude: 10,
        longitude: 10,
      });
    }

    const { gyms } = await sut.execute({
      search: "Sample",
      pagination: {
        page: 2,
        maximumNumberOfItems: 6,
      },
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Sample Gym 7" }),
      expect.objectContaining({ name: "Sample Gym 8" }),
    ]);
  });
});
