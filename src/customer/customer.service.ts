import { CREATED_SUCCESSFULLY, DELETED_SUCCESSFULLY, UPDATED_SUCCESSFULLY } from "../../messages";
import { Injectable } from "@nestjs/common";

import { validateMailRegex } from "../../shared/constants/validations";
import { CustomError } from "../../shared/custom-error/custom-error";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { CustomerRepository } from "./customer.repository";
import { Customer } from "./entities/customer.entity";

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepo: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto) {
    this.validateCustomerEmail(createCustomerDto.email);
    const customer = this.buildCustomer(createCustomerDto);
    await this.checkIfCustomerExists(customer.email);

    const newCustomer = await this.customerRepo.create(customer);
    if (!newCustomer) throw new CustomError(400, "Something went wrong!");
    return newCustomer;
  }

  private buildCustomer(createCustomerDto: CreateCustomerDto): Customer {
    const customer = new Customer();
    customer.email = createCustomerDto.email;
    customer.name = createCustomerDto.name;
    return customer;
  }

  private async checkIfCustomerExists(email: string) {
    const existingCustomer = await this.customerRepo.findByMail(email);
    if (existingCustomer) throw new CustomError(400, "Customer already exists!");
  }

  private validateCustomerEmail(email: string) {
    if (!email || !this.isValidEmail(email)) {
      throw new CustomError(400, "Invalid email address!");
    }
  }

  private isValidEmail(email: string): boolean {
    return validateMailRegex.test(String(email).toLowerCase());
  }

  async findAll() {
    return await this.customerRepo.findAll();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) throw new CustomError(404, "Customer not found!");
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = await this.customerRepo.update(id, updateCustomerDto);
    if (updatedCustomer.affected == 0) throw new CustomError(404, "Customer not found!");
    return { message: UPDATED_SUCCESSFULLY };
  }

  async remove(id: number) {
    const deletedCustomer = await this.customerRepo.remove(+id);
    if (deletedCustomer.affected == 0) throw new CustomError(404, "Customer not found!");
    return { message: DELETED_SUCCESSFULLY };
  }

  async getOneByMail(email: string) {
    return await this.customerRepo.findByMail(email);
  }

  async findOneByEmail(email: string) {
    const customer = await this.customerRepo.findByMail(email);
    if (!customer) throw new CustomError(404, "Customer not found!");
    return customer;
  }
}
