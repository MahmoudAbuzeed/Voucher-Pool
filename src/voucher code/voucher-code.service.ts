import { CREATED_SUCCESSFULLY, DELETED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from "messages";
import { Injectable } from "@nestjs/common";

import { CreateVoucherCodeDto } from "./dto/create-voucher-code.dto";
import { UpdateVoucherCodeDto } from "./dto/update-voucher-code.dto";
import { ErrorHandler } from "shared/errorHandler.service";
import { VoucherCodeRepo } from "./voucher-code.repository";
import { ulid } from "ulid";

@Injectable()
export class VoucherCodeService {
  constructor(private readonly voucherCodeRepo: VoucherCodeRepo, private readonly errorHandler: ErrorHandler) {}

  async create(createVoucherCodeDto: CreateVoucherCodeDto) {
    try {
      createVoucherCodeDto.code = ulid();
      createVoucherCodeDto.expired_at = new Date();
      createVoucherCodeDto.expired_at.setDate(createVoucherCodeDto.expired_at.getDate() + 3);
      await this.voucherCodeRepo.create(createVoucherCodeDto);
      return { message: CREATED_SUCCESSFULLY };
    } catch (error) {
      throw this.errorHandler.badRequest(error);
    }
  }

  async findAll() {
    try {
      return await this.voucherCodeRepo.findAll();
    } catch (error) {
      throw this.errorHandler.badRequest(error);
    }
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
