import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { UpdateCustomerDto } from "./dto/update-customer.dto";

import { Customer } from "./entities/customer.entity";

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(customer: Customer) {
    return await this.customerRepository.save(customer);
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

  async findByMail(email: string) {
    return await this.customerRepository.findOne({ where: { email } });
  }
}
