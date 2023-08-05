import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { UpdateSpecialOfferDto } from "./dto/update-special-offer.dto";

import { SpecialOffer } from "./entities/special-offer.entity";

@Injectable()
export class SpecialOfferRepo {
  constructor(
    @InjectRepository(SpecialOffer)
    private specialOfferRepository: Repository<SpecialOffer>,
  ) {}

  async create(specialOffer: SpecialOffer) {
    return await this.specialOfferRepository.save(specialOffer);
  }

  async findAll() {
    return await this.specialOfferRepository.find();
  }

  async findOne(id: number) {
    return await this.specialOfferRepository.findOne(id);
  }

  async update(id: number, updateSpecialOfferDto: UpdateSpecialOfferDto) {
    return await this.specialOfferRepository.update(id, updateSpecialOfferDto);
  }

  async remove(id: number) {
    return await this.specialOfferRepository.delete({ id });
  }

  async findByMail(email: string) {
    return await this.specialOfferRepository.findOne({ where: { email } });
  }

  async findByName(name: string) {
    return await this.specialOfferRepository.findOne({ where: { name } });
  }
}
