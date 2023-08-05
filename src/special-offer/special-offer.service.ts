import { DELETED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from "messages";
import { Injectable } from "@nestjs/common";

import { CreateSpecialOfferDto } from "./dto/create-special-offer.dto";
import { UpdateSpecialOfferDto } from "./dto/update-special-offer.dto";
import { SpecialOfferRepo } from "./special-offer.repository";
import { CustomError } from "shared/custom-error/custom-error";
import { SpecialOffer } from "./entities/special-offer.entity";

@Injectable()
export class SpecialOfferService {
  constructor(private readonly specialOfferRepo: SpecialOfferRepo) {}

  async create(createSpecialOfferDto: CreateSpecialOfferDto) {
    await this.checkIfSpecialOfferExists(createSpecialOfferDto.name);
    const newSpecialOffer = this.buildSpecialOffer(createSpecialOfferDto);

    return this.createSpecialOfferInRepo(newSpecialOffer);
  }

  private async checkIfSpecialOfferExists(name: string) {
    const existingSpecialOffer = await this.specialOfferRepo.findByName(name);
    if (existingSpecialOffer) {
      throw new CustomError(400, "Special offer already exists!");
    }
  }

  private buildSpecialOffer(createSpecialOfferDto: CreateSpecialOfferDto): SpecialOffer {
    const specialOffer = new SpecialOffer();
    specialOffer.name = createSpecialOfferDto.name;
    specialOffer.fixed_percentage_discount = createSpecialOfferDto.fixed_percentage_discount;

    return specialOffer;
  }

  private async createSpecialOfferInRepo(specialOffer: SpecialOffer) {
    const newSpecialOffer = await this.specialOfferRepo.create(specialOffer);
    if (!newSpecialOffer) throw new CustomError(400, "Something went wrong!");

    return newSpecialOffer;
  }

  async findAll() {
    return await this.specialOfferRepo.findAll();
  }

  async findOne(id: number) {
    const specialOffer = await this.specialOfferRepo.findOne(id);
    if (!specialOffer) throw new CustomError(404, "Special offer not found!");
    return specialOffer;
  }

  async update(id: number, updateSpecialOfferDto: UpdateSpecialOfferDto) {
    const updatedSpecialOffer = await this.specialOfferRepo.update(id, updateSpecialOfferDto);
    if (updatedSpecialOffer.affected == 0) throw new CustomError(404, "Special offer not found!");
    return { message: UPDATED_SUCCESSFULLY };
  }

  async remove(id: number) {
    const deletedSpecialOffer = await this.specialOfferRepo.remove(+id);
    if (deletedSpecialOffer.affected == 0) throw new CustomError(404, "Special offer not found!");
    return { message: DELETED_SUCCESSFULLY };
  }

  async getOneByMail(email: string) {
    const specialOffer = await this.specialOfferRepo.findByMail(email);
    if (!specialOffer) throw new CustomError(404, "Special offer not found!");
    return specialOffer;
  }
}
