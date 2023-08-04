import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateSpecialOfferDto } from "./dto/create-special-offer.dto";
import { UpdateSpecialOfferDto } from "./dto/update-special-offer.dto";
import { SpecialOfferService } from "./special-offer.service";

@ApiTags("Special Offer")
@Controller("special-offer")
export class SpecialOfferController {
  constructor(private readonly specialOfferService: SpecialOfferService) {}

  @Get()
  findAll() {
    return this.specialOfferService.findAll();
  }

  @Post()
  create(@Body() createSpecialOfferDto: CreateSpecialOfferDto) {
    return this.specialOfferService.create(createSpecialOfferDto);
  }

  @Get("/:specialOfferId")
  findOne(@Param("specialOfferId") specialOfferId: string) {
    return this.specialOfferService.findOne(+specialOfferId);
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
