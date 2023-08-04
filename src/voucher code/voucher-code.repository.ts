import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { CreateVoucherCodeDto } from "./dto/create-voucher-code.dto";
import { UpdateVoucherCodeDto } from "./dto/update-voucher-code.dto";

import { VoucherCode } from "./entities/voucher-code.entity";

@Injectable()
export class VoucherCodeRepo {
  constructor(
    @InjectRepository(VoucherCode)
    private voucherCodeRepository: Repository<VoucherCode>,
  ) {}

  async create(createVoucherCodeDto: CreateVoucherCodeDto) {
    return await this.voucherCodeRepository.save(createVoucherCodeDto);
  }

  async findAll() {
    return await this.voucherCodeRepository.find();
  }

  async findOne(id: number) {
    return await this.voucherCodeRepository.findOne(id);
  }

  async update(id: number, updateVoucherCodeDto: UpdateVoucherCodeDto) {
    return await this.voucherCodeRepository.update(id, updateVoucherCodeDto);
  }

  async updateByEmail(customer: string, updateVoucherCodeDto: UpdateVoucherCodeDto) {
    return await this.voucherCodeRepository.update(customer, updateVoucherCodeDto);
  }

  async remove(id: number) {
    return await this.voucherCodeRepository.delete({ id });
  }

  async findByMail(email: string) {
    return await this.voucherCodeRepository.findOne({ where: { email } });
  }
}
