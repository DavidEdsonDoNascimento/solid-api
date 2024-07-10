import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";

describe("Create Gym  Use Case", () => {
  it("should be able to create gym", async () => {
    const gymRepository = new InMemoryGymsRepository();
    const sut = new CreateGymUseCase(gymRepository);
    const gym = await sut.execute({
      name: "gym-1",
      description: "Gym 1 Description",
      phone: "1234567890",
      latitude: -26.6374551,
      longitude: -48.6839573,
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
