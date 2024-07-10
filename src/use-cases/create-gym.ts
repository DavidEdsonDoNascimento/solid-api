import { IGym, IGymsRepository } from "@/interfaces/gym";

export class CreateGymUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: IGym): Promise<IGym> {
    const gym = await this.gymRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    });

    return gym;
  }
}
