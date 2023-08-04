import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { ErrorHandler } from "shared/errorHandler.service";
import { VoucherCode } from "./entities/voucher-code.entity";
import { voucherCodeController } from "./voucher-code.controller";
import { VoucherCodeService } from "./voucher-code.service";
import { VoucherCodeRepo } from "./voucher-code.repository";

@Module({
  imports: [TypeOrmModule.forFeature([VoucherCode])],
  controllers: [voucherCodeController],
  providers: [VoucherCodeService, VoucherCodeRepo, ErrorHandler],
})
export class VoucherCodeModule {}
