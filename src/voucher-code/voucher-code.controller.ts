import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ValidateVoucherCodeDto } from "./dto/validate-voucher-code.dto";
import { CreateVoucherCodeDto } from "./dto/create-voucher-code.dto";
import { UpdateVoucherCodeDto } from "./dto/update-voucher-code.dto";
import { VoucherCodeService } from "./voucher-code.service";

@ApiTags("Voucher Code")
@Controller("voucher-code")
export class voucherCodeController {
  constructor(private readonly voucherCodeService: VoucherCodeService) {}

  @Get()
  findAll() {
    return this.voucherCodeService.findAll();
  }

  @Post()
  create(@Body() createVoucherCodeDto: CreateVoucherCodeDto) {
    return this.voucherCodeService.create(createVoucherCodeDto);
  }

  @Post("/validate-voucher")
  validateVoucher(@Body() validateVoucherCodeDto: ValidateVoucherCodeDto) {
    return this.voucherCodeService.validateVoucher(validateVoucherCodeDto);
  }

  @Get("/:voucherCodeId")
  findOne(@Param("voucherCodeId") voucherCodeId: string) {
    return this.voucherCodeService.findOne(+voucherCodeId);
  }

  @Patch()
  update(@Body() updateVoucherCodeDto: UpdateVoucherCodeDto) {
    return this.voucherCodeService.updateByEmail(updateVoucherCodeDto.customer_email, updateVoucherCodeDto);
  }

  @Delete(":voucherCodeId")
  remove(@Param("voucherCodeId") voucherCodeId: string) {
    return this.voucherCodeService.remove(+voucherCodeId);
  }
}
