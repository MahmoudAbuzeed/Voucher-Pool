import { CREATED_SUCCESSFULLY, DELETED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from "messages";
import { Injectable } from "@nestjs/common";

import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { ErrorHandler } from "shared/errorHandler.service";
import { CustomerRepo } from "./customer.repository";

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepo: CustomerRepo, private readonly errorHandler: ErrorHandler) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      await this.customerRepo.create(createCustomerDto);
      return { message: CREATED_SUCCESSFULLY };
    } catch (error) {
      throw this.errorHandler.badRequest(error);
    }
  }

  async findAll() {
    try {
      return await this.customerRepo.findAll();
    } catch (error) {
      throw this.errorHandler.badRequest(error);
    }
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) throw this.errorHandler.notFound();
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = await this.customerRepo.update(id, updateCustomerDto);
    if (updatedCustomer.affected == 0) throw this.errorHandler.notFound();
    return { message: UPDATED_SUCCESSFULLY };
  }

  async remove(id: number) {
    const deletedCustomer = await this.customerRepo.remove(+id);
    if (deletedCustomer.affected == 0) throw this.errorHandler.notFound();
    return { message: DELETED_SUCCESSFULLY };
  }

  async getOneByMail(email: string) {
    return await this.customerRepo.findByMail(email);
  }
}
