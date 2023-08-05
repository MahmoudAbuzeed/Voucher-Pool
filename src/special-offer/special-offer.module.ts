import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { SpecialOfferController } from "./special-offer.controller";
import { SpecialOffer } from "./entities/special-offer.entity";
import { SpecialOfferService } from "./special-offer.service";
import { SpecialOfferRepo } from "./special-offer.repository";
import { ErrorHandler } from "shared/errorHandler.service";

@Module({
  imports: [TypeOrmModule.forFeature([SpecialOffer])],
  controllers: [SpecialOfferController],
  providers: [SpecialOfferService, SpecialOfferRepo, ErrorHandler],
  exports: [TypeOrmModule],
})
export class SpecialOfferModule {}
