import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { ErrorHandler } from "shared/errorHandler.service";
import { VoucherCode } from "./entities/voucher-code.entity";
import { voucherCodeController } from "./voucher-code.controller";
import { VoucherCodeService } from "./voucher-code.service";
import { VoucherCodeRepo } from "./voucher-code.repository";
import { CustomerService } from "../../src/customer/customer.service";
import { CustomerRepository } from "../customer/customer.repository";
import { CustomerModule } from "../../src/customer/customer.module";
import { SpecialOfferService } from "../../src/special-offer/special-offer.service";
import { SpecialOfferRepo } from "../../src/special-offer/special-offer.repository";
import { SpecialOfferModule } from "../../src/special-offer/special-offer.module";

@Module({
  imports: [TypeOrmModule.forFeature([VoucherCode]), CustomerModule, SpecialOfferModule],
  controllers: [voucherCodeController],
  providers: [
    VoucherCodeService,
    VoucherCodeRepo,
    ErrorHandler,
    CustomerService,
    CustomerRepository,
    SpecialOfferService,
    SpecialOfferRepo,
  ],
  exports: [TypeOrmModule],
})
export class VoucherCodeModule {}
