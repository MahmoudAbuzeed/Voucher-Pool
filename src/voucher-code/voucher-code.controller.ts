import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SkipThrottle, Throttle } from "@nestjs/throttler";

import { ValidateVoucherCodeDto } from "./dto/validate-voucher-code.dto";
import { CreateVoucherCodeDto } from "./dto/create-voucher-code.dto";
import { UpdateVoucherCodeDto } from "./dto/update-voucher-code.dto";
import { VoucherCodeService } from "./voucher-code.service";
import { VoucherCodeMapper } from "./mappers/voucher-code.mapper";

@SkipThrottle()
@ApiTags("Voucher Code")
@Controller("voucher-code")
export class voucherCodeController {
  constructor(
    private readonly voucherCodeService: VoucherCodeService,
    private readonly voucherCodeMapper: VoucherCodeMapper,
  ) {}

  @Throttle(10, 60) // 10 requests per 60 seconds
  @Get()
  async findAll() {
    const vouchers = await this.voucherCodeService.findAll();
    return this.voucherCodeMapper.mapVouchers(vouchers);
  }

  @Throttle(5, 60) // 5 requests per 60 seconds
  @Post()
  async create(@Body() createVoucherCodeDto: CreateVoucherCodeDto) {
    const voucherCode = await this.voucherCodeService.create(createVoucherCodeDto);
    return this.voucherCodeMapper.mapSingleVoucher(voucherCode);
  }

  @Throttle(5, 60) // 5 requests per 60 seconds
  @Post("/validate-voucher")
  async validateVoucher(@Body() validateVoucherCodeDto: ValidateVoucherCodeDto) {
    const voucherCode = await this.voucherCodeService.validateVoucher(validateVoucherCodeDto);
    return this.voucherCodeMapper.mapSingleVoucher(voucherCode);
  }
 
  @Throttle(10, 60) // 10 requests per 60 seconds
  @Get("/:voucherCodeId")
  async findOne(@Param("voucherCodeId") voucherCodeId: string) {
    const voucherCode = await this.voucherCodeService.findOne(+voucherCodeId);
    return this.voucherCodeMapper.mapSingleVoucher(voucherCode);
  }

  @Throttle(10, 60) // 10 requests per 60 seconds
  @Patch()
  update(@Body() updateVoucherCodeDto: UpdateVoucherCodeDto) {
    return this.voucherCodeService.updateByEmail(updateVoucherCodeDto.customer_email, updateVoucherCodeDto);
  }

  @Throttle(10, 60) // 10 requests per 60 seconds
  @Delete(":voucherCodeId")
  remove(@Param("voucherCodeId") voucherCodeId: string) {
    return this.voucherCodeService.remove(+voucherCodeId);
  }
}
