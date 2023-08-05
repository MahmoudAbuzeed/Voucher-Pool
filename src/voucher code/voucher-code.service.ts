/* eslint-disable @typescript-eslint/no-var-requires */
import { CREATED_SUCCESSFULLY, DELETED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from "messages";
import { Injectable } from "@nestjs/common";

import { SpecialOffer } from "src/special offer/entities/special-offer.entity";
import { SpecialOfferService } from "src/Special Offer/special-offer.service";
import { ValidateVoucherCodeDto } from "./dto/validate-voucher-code.dto";
import { UpdateVoucherCodeDto } from "./dto/update-voucher-code.dto";
import { CreateVoucherCodeDto } from "./dto/create-voucher-code.dto";
import { Customer } from "src/customer/entities/customer.entity";
import { CustomerService } from "src/customer/customer.service";
import { VoucherCode } from "./entities/voucher-code.entity";
import { VoucherCodeRepo } from "./voucher-code.repository";
import { ErrorHandler } from "shared/errorHandler.service";
const voucher_codes = require("voucher-code-generator");

@Injectable()
export class VoucherCodeService {
  constructor(
    private readonly voucherCodeRepo: VoucherCodeRepo,
    private readonly customerService: CustomerService,
    private readonly specialOfferService: SpecialOfferService,
    private readonly errorHandler: ErrorHandler,
  ) {}

  async create(createVoucherCodeDto: CreateVoucherCodeDto) {
    const { customer, specialOffer } = await this.findCustomerAndOffer(createVoucherCodeDto);
    const voucherCode = this.constructVoucherCode(customer, specialOffer);
    await this.voucherCodeRepo.create(voucherCode);
    return { message: CREATED_SUCCESSFULLY };
  }

  private async findCustomerAndOffer(createVoucherCodeDto: CreateVoucherCodeDto) {
    const customer = await this.customerService.findOneByEmail(createVoucherCodeDto.customer_email);
    const specialOffer = await this.specialOfferService.findOne(createVoucherCodeDto.special_offer_id);
    return { customer, specialOffer };
  }

  private constructVoucherCode(customer: Customer, specialOffer: SpecialOffer): VoucherCode {
    const voucherCode = new VoucherCode();
    const code = voucher_codes.generate({ length: 8 });

    voucherCode.code = code[0].toUpperCase();
    voucherCode.expired_at = new Date();
    voucherCode.expired_at.setDate(voucherCode.expired_at.getDate() + 3);
    voucherCode.used_at = null;
    voucherCode.customer = customer;
    voucherCode.specialOffer = specialOffer;
    return voucherCode;
  }

  async validateVoucher(validateVoucherCodeDto: ValidateVoucherCodeDto) {
    const voucherCode = await this.voucherCodeRepo.findByCode(validateVoucherCodeDto.code);
    if (!voucherCode) throw this.errorHandler.notFound();
    if (voucherCode.customer.email != validateVoucherCodeDto.customer_email) {
      throw this.errorHandler.invalidVoucherCode();
    }

    if (voucherCode.expired_at < new Date()) throw this.errorHandler.expiredVoucherCode();

    await this.voucherCodeRepo.update(voucherCode.id, {
      used: true,
      used_at: new Date(),
    });

    return voucherCode;
  }

  async findAll() {
    return await this.voucherCodeRepo.findAll();
  }

  async findOne(id: number) {
    const voucherCode = await this.voucherCodeRepo.findOne(id);
    if (!voucherCode) throw this.errorHandler.notFound();
    return voucherCode;
  }

  async update(id: number, updateVoucherCodeDto: UpdateVoucherCodeDto) {
    const updatedVoucherCode = await this.voucherCodeRepo.update(id, updateVoucherCodeDto);
    if (updatedVoucherCode.affected == 0) throw this.errorHandler.notFound();
    return { message: UPDATED_SUCCESSFULLY };
  }

  async updateByEmail(customer_email: string, updateVoucherCodeDto: UpdateVoucherCodeDto) {
    const updatedVoucherCode = await this.voucherCodeRepo.updateByEmail(customer_email, updateVoucherCodeDto);
    if (updatedVoucherCode.affected == 0) throw this.errorHandler.notFound();
    return { message: UPDATED_SUCCESSFULLY };
  }

  async remove(id: number) {
    const deletedVoucherCode = await this.voucherCodeRepo.remove(+id);
    if (deletedVoucherCode.affected == 0) throw this.errorHandler.notFound();
    return { message: DELETED_SUCCESSFULLY };
  }

  async getOneByMail(email: string) {
    return await this.voucherCodeRepo.findByMail(email);
  }
}
