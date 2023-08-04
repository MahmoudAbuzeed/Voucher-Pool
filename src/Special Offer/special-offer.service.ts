import { CREATED_SUCCESSFULLY, DELETED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from "messages";
import { Injectable } from "@nestjs/common";

import { CreateSpecialOfferDto } from "./dto/create-special-offer.dto";
import { UpdateSpecialOfferDto } from "./dto/update-special-offer.dto";
import { ErrorHandler } from "shared/errorHandler.service";
import { SpecialOfferRepo } from "./special-offer.repository";

@Injectable()
export class SpecialOfferService {
  constructor(private readonly specialOfferRepo: SpecialOfferRepo, private readonly errorHandler: ErrorHandler) {}

  async create(createSpecialOfferDto: CreateSpecialOfferDto) {
    try {
      await this.specialOfferRepo.create(createSpecialOfferDto);
      return { message: CREATED_SUCCESSFULLY };
    } catch (error) {
      throw this.errorHandler.badRequest(error);
    }
  }

  async findAll() {
    try {
      return await this.specialOfferRepo.findAll();
    } catch (error) {
      throw this.errorHandler.badRequest(error);
    }
  }

  async findOne(id: number) {
    const specialOffer = await this.specialOfferRepo.findOne(id);
    if (!specialOffer) throw this.errorHandler.notFound();
    return specialOffer;
  }

  async update(id: number, updateSpecialOfferDto: UpdateSpecialOfferDto) {
    const updatedSpecialOffer = await this.specialOfferRepo.update(id, updateSpecialOfferDto);
    if (updatedSpecialOffer.affected == 0) throw this.errorHandler.notFound();
    return { message: UPDATED_SUCCESSFULLY };
  }

  async remove(id: number) {
    const deletedSpecialOffer = await this.specialOfferRepo.remove(+id);
    if (deletedSpecialOffer.affected == 0) throw this.errorHandler.notFound();
    return { message: DELETED_SUCCESSFULLY };
  }

  async getOneByMail(email: string) {
    return await this.specialOfferRepo.findByMail(email);
  }
}
