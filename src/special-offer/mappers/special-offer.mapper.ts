/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { SpecialOfferViewDto } from "../dto/customer-view.dto";

@Injectable()
export class SpecialOfferMapper {
  mapSingleSpecialOffer(specialOffer): SpecialOfferViewDto {
    const specialOfferDto = new SpecialOfferViewDto();
    specialOfferDto.id = specialOffer.id;
    specialOfferDto.name = specialOffer.name;
    specialOfferDto.fixed_percentage_discount = specialOffer.fixed_percentage_discount;
    specialOfferDto.created_at = specialOffer.created_at;
    return specialOfferDto;
  }

  mapSpecialOffers(specialOffers): SpecialOfferViewDto[] {
    return specialOffers.map((specialOffer) => this.mapSingleSpecialOffer(specialOffer));
  }
}
