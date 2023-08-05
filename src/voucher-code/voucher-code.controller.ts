import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ValidateVoucherCodeDto } from "./dto/validate-voucher-code.dto";
import { CreateVoucherCodeDto } from "./dto/create-voucher-code.dto";
import { UpdateVoucherCodeDto } from "./dto/update-voucher-code.dto";
import { VoucherCodeService } from "./voucher-code.service";
import { VoucherCodeMapper } from "./mappers/voucher-code.mapper";

@ApiTags("Voucher Code")
@Controller("voucher-code")
export class voucherCodeController {
  constructor(
    private readonly voucherCodeService: VoucherCodeService,
    private readonly voucherCodeMapper: VoucherCodeMapper,
  ) {}

  @Get()
  async findAll() {
    const vouchers = await this.voucherCodeService.findAll();
    return this.voucherCodeMapper.mapVouchers(vouchers);
  }

  @Post()
  async create(@Body() createVoucherCodeDto: CreateVoucherCodeDto) {
    const voucherCode = await this.voucherCodeService.create(createVoucherCodeDto);
    return this.voucherCodeMapper.mapSingleVoucher(voucherCode);
  }

  @Post("/validate-voucher")
  async validateVoucher(@Body() validateVoucherCodeDto: ValidateVoucherCodeDto) {
    const voucherCode = await this.voucherCodeService.validateVoucher(validateVoucherCodeDto);
    return this.voucherCodeMapper.mapSingleVoucher(voucherCode);
  }

  @Get("/:voucherCodeId")
  async findOne(@Param("voucherCodeId") voucherCodeId: string) {
    const voucherCode = await this.voucherCodeService.findOne(+voucherCodeId);
    return this.voucherCodeMapper.mapSingleVoucher(voucherCode);
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
