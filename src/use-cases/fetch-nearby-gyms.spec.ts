import { IGymsRepository } from "@/interfaces/gym";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: IGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch nearby gyms use case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      name: "Sample Gym 1 Barra Velha",
      description: "Gym 1 description",
      phone: "1234567890",
      latitude: -26.635426155682826,
      longitude: -48.695645175072904,
    });
    await gymsRepository.create({
      name: "Sample Gym 2 Barra Velha",
      description: "Gym 2 description",
      phone: "1234567890",
      latitude: -26.633953380149457,
      longitude: -48.68906855856381,
    });
    await gymsRepository.create({
      name: "Sample Gym 1 Navegantes",
      description: "Gym 1 description",
      phone: "1234567890",
      latitude: -26.891486994073098,
      longitude: -48.64660342531988,
    });

    const { gyms } = await sut.execute({
      userLatitude: -26.6355499174679,
      userLongitude: -48.692488399148544,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Sample Gym 1 Barra Velha" }),
      expect.objectContaining({ name: "Sample Gym 2 Barra Velha" }),
    ]);
  });
});
