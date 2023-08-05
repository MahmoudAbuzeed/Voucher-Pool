import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { SpecialOfferController } from "./special-offer.controller";
import { SpecialOffer } from "./entities/special-offer.entity";
import { SpecialOfferService } from "./special-offer.service";
import { SpecialOfferRepo } from "./special-offer.repository";
import { SpecialOfferMapper } from "./mappers/special-offer.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([SpecialOffer])],
  controllers: [SpecialOfferController],
  providers: [SpecialOfferService, SpecialOfferRepo, SpecialOfferMapper],
  exports: [TypeOrmModule],
})
export class SpecialOfferModule {}
