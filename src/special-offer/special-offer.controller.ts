import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateSpecialOfferDto } from "./dto/create-special-offer.dto";
import { UpdateSpecialOfferDto } from "./dto/update-special-offer.dto";
import { SpecialOfferService } from "./special-offer.service";
import { SpecialOfferMapper } from "./mappers/special-offer.mapper";

@ApiTags("Special Offer")
@Controller("special-offer")
export class SpecialOfferController {
  constructor(
    private readonly specialOfferService: SpecialOfferService,
    private readonly specialOfferMapper: SpecialOfferMapper,
  ) {}

  @Get()
  async findAll() {
    const specialOffers = await this.specialOfferService.findAll();
    return this.specialOfferMapper.mapSpecialOffers(specialOffers);
  }

  @Post()
  async create(@Body() createSpecialOfferDto: CreateSpecialOfferDto) {
    const specialOffer = await this.specialOfferService.create(createSpecialOfferDto);
    return this.specialOfferMapper.mapSingleSpecialOffer(specialOffer);
  }

  @Get("/:specialOfferId")
  async findOne(@Param("specialOfferId") specialOfferId: string) {
    const specialOffer = await this.specialOfferService.findOne(+specialOfferId);
    return this.specialOfferMapper.mapSingleSpecialOffer(specialOffer);
  }

  @Patch("/:specialOfferId")
  update(@Param("specialOfferId") specialOfferId: string, @Body() updateSpecialOfferDto: UpdateSpecialOfferDto) {
    return this.specialOfferService.update(+specialOfferId, updateSpecialOfferDto);
  }

  @Delete(":specialOfferId")
  remove(@Param("specialOfferId") specialOfferId: string) {
    return this.specialOfferService.remove(+specialOfferId);
  }
}
