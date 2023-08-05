import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { SkipThrottle, Throttle } from "@nestjs/throttler";
import { ApiTags } from "@nestjs/swagger";

import { CreateSpecialOfferDto } from "./dto/create-special-offer.dto";
import { UpdateSpecialOfferDto } from "./dto/update-special-offer.dto";
import { SpecialOfferService } from "./special-offer.service";
import { SpecialOfferMapper } from "./mappers/special-offer.mapper";

@SkipThrottle()
@ApiTags("Special Offer")
@Controller("special-offer")
export class SpecialOfferController {
  constructor(
    private readonly specialOfferService: SpecialOfferService,
    private readonly specialOfferMapper: SpecialOfferMapper,
  ) {}

  @Throttle(10, 60) // 10 requests per 60 seconds
  @Get()
  async findAll() {
    const specialOffers = await this.specialOfferService.findAll();
    return this.specialOfferMapper.mapSpecialOffers(specialOffers);
  }

  @Throttle(5, 60) // 5 requests per 60 seconds
  @Post()
  async create(@Body() createSpecialOfferDto: CreateSpecialOfferDto) {
    const specialOffer = await this.specialOfferService.create(createSpecialOfferDto);
    return this.specialOfferMapper.mapSingleSpecialOffer(specialOffer);
  }

  @Throttle(10, 60) // 10 requests per 60 seconds
  @Get("/:specialOfferId")
  async findOne(@Param("specialOfferId") specialOfferId: string) {
    const specialOffer = await this.specialOfferService.findOne(+specialOfferId);
    return this.specialOfferMapper.mapSingleSpecialOffer(specialOffer);
  }

  @Throttle(5, 60) // 5 requests per 60 seconds
  @Patch("/:specialOfferId")
  update(@Param("specialOfferId") specialOfferId: string, @Body() updateSpecialOfferDto: UpdateSpecialOfferDto) {
    return this.specialOfferService.update(+specialOfferId, updateSpecialOfferDto);
  }

  @Throttle(5, 60) // 5 requests per 60 seconds
  @Delete(":specialOfferId")
  remove(@Param("specialOfferId") specialOfferId: string) {
    return this.specialOfferService.remove(+specialOfferId);
  }
}
