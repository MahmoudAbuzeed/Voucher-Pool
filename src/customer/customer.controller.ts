import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { CustomerMapper } from "./mappers/customer.mapper";
import { CustomerService } from "./customer.service";

@ApiTags("Customer")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private readonly customerMapper: CustomerMapper) {}

  @Get()
  async findAll() {
    const customers = await this.customerService.findAll();
    return this.customerMapper.mapManyCustomers(customers);
  }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.create(createCustomerDto);
    return this.customerMapper.mapSingleCustomer(customer);
  }

  @Get("/:customerId")
  async findOne(@Param("customerId") customerId: string) {
    const customer = await this.customerService.findOne(+customerId);
    return this.customerMapper.mapSingleCustomer(customer);
  }

  @Patch("/:customerId")
  update(@Param("customerId") customerId: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+customerId, updateCustomerDto);
  }

  @Delete(":customerId")
  remove(@Param("customerId") customerId: string) {
    return this.customerService.remove(+customerId);
  }
}
