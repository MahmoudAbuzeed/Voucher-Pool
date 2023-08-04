import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

import { Customer } from "./entities/customer.entity";

@Injectable()
export class CustomerRepo {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerRepository.save(createCustomerDto);
  }

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: number) {
    return await this.customerRepository.findOne(id);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerRepository.update(id, updateCustomerDto);
  }

  async remove(id: number) {
    return await this.customerRepository.delete({ id });
  }
}
