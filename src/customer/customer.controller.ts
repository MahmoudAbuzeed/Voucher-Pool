import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { SkipThrottle, Throttle } from "@nestjs/throttler";
import { ApiTags } from "@nestjs/swagger";

import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { CustomerMapper } from "./mappers/customer.mapper";
import { CustomerService } from "./customer.service";

@SkipThrottle()
@ApiTags("Customer")
@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private readonly customerMapper: CustomerMapper) {}

  @Throttle(10, 60) // 10 requests per 60 seconds
  @Get()
  async findAll() {
    const customers = await this.customerService.findAll();
    return this.customerMapper.mapCustomers(customers);
  }

  @Throttle(5, 60) // 5 requests per 60 seconds
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.create(createCustomerDto);
    return this.customerMapper.mapSingleCustomer(customer);
  }

  @Throttle(10, 60) // 10 requests per 60 seconds
  @Get("/:customerId")
  async findOne(@Param("customerId") customerId: string) {
    const customer = await this.customerService.findOne(+customerId);
    return this.customerMapper.mapSingleCustomer(customer);
  }

  @Throttle(5, 60) // 5 requests per 60 seconds
  @Patch("/:customerId")
  update(@Param("customerId") customerId: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+customerId, updateCustomerDto);
  }

  @Throttle(10, 60) // 10 requests per 60 seconds
  @Delete(":customerId")
  remove(@Param("customerId") customerId: string) {
    return this.customerService.remove(+customerId);
  }
}
