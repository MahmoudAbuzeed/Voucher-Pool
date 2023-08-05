/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { VoucherCodeViewDto } from "../dto/voucher-code-view.dto";

@Injectable()
export class VoucherCodeMapper {
  mapSingleVoucher(voucher): VoucherCodeViewDto {
    const voucherDto = new VoucherCodeViewDto();
    voucherDto.id = voucher.id;
    voucherDto.code = voucher.code;
    voucherDto.used = voucher.used;
    voucherDto.used_at = voucher.used_at;
    voucherDto.expired_at = voucher.expired_at;
    return voucherDto;
  }

  mapVouchers(vouchers): VoucherCodeViewDto[] {
    return vouchers.map((voucher) => this.mapSingleVoucher(voucher));
  }
}
